import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: NextRequest) {
  try {
    const { text, speed, voice } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    const output = await replicate.run(
      "jaaari/kokoro-82m:dfdf537ba482b029e0a761699e6f55e9162cfd159270bfe0e44857caa5f275a6",
      {
        input: {
          text,
          speed,
          voice,
        },
      }
    );

    // Fetch the audio file from the Replicate URL
    const audioResponse = await fetch(output as string);
    const audioBuffer = await audioResponse.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/wav",
        "Content-Disposition": 'attachment; filename="generated-audio.wav"',
      },
    });
  } catch (error) {
    console.error("Error generating audio:", error);
    return NextResponse.json(
      { error: "Failed to generate audio" },
      { status: 500 }
    );
  }
} 