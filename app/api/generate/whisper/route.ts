import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY environment variable");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface OpenAIError {
  message: string;
  type: string;
  status: number;
}

export async function POST(request: NextRequest) {
  try {
    const { text, speed, voice, model, format } = await request.json();

    // Validate required fields
    if (!text) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    if (!voice || !model || !format) {
      return NextResponse.json(
        { error: "Voice, model, and format are required" },
        { status: 400 }
      );
    }

    console.log("Generating audio with parameters:", {
      model,
      voice,
      speed,
      format,
      textLength: text.length,
    });

    try {
      const response = await openai.audio.speech.create({
        model,
        voice,
        input: text,
        speed,
        response_format: format,
      });

      // Get the audio data as an ArrayBuffer
      const audioData = await response.arrayBuffer();

      console.log("Successfully generated audio");

      return new NextResponse(audioData, {
        headers: {
          "Content-Type": `audio/${format}`,
          "Content-Disposition": `attachment; filename="generated-audio.${format}"`,
        },
      });
    } catch (openaiError) {
      const error = openaiError as OpenAIError;
      console.error("OpenAI API Error:", {
        error,
        message: error.message,
        type: error.type,
        status: error.status,
      });

      // Return specific error message from OpenAI if available
      return NextResponse.json(
        { 
          error: error.message || "Failed to generate audio",
          type: error.type,
        },
        { status: error.status || 500 }
      );
    }
  } catch (error) {
    console.error("Request processing error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
} 