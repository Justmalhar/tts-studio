"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Voice {
  voice_id: string;
  name: string;
  description?: string;
  labels?: Record<string, string>;
  preview_url?: string;
}

const MODEL_OPTIONS = [
  { id: "eleven_multilingual_v2", name: "Multilingual V2", description: "High-quality voice with support for 28+ languages" },
  { id: "eleven_turbo_v2", name: "Turbo", description: "Fast, efficient voice generation" },
];

interface FormData {
  text: string;
  voice: string;
  model: string;
}

export default function ElevenLabsProvider() {
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [voices, setVoices] = useState<Voice[]>([]);
  const [isLoadingVoices, setIsLoadingVoices] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    text: "",
    voice: "",
    model: MODEL_OPTIONS[0].id,
  });

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await fetch("/api/voices/elevenlabs");
        if (!response.ok) {
          throw new Error("Failed to fetch voices");
        }
        const data = await response.json();
        setVoices(data.voices);
        if (data.voices.length > 0) {
          setFormData(prev => ({ ...prev, voice: data.voices[0].voice_id }));
        }
      } catch (error) {
        console.error("Error fetching voices:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch voices");
      } finally {
        setIsLoadingVoices(false);
      }
    };

    fetchVoices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAudioUrl(null);
    setError(null);
    
    try {
      const response = await fetch("/api/generate/elevenlabs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate audio. Please try again.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.error("Error generating audio:", error);
      setError(error instanceof Error ? error.message : "Failed to generate audio. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!audioUrl) return;
    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = "generated-audio.mp3";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4"
    >
      <div className="mb-8 mt-4 flex items-start gap-4">
        <div className="h-16 w-16 rounded-lg p-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 876 876" className="w-full h-full" fill="black" title="ElevenLabs Logo">
            <path d="M468 292H528V584H468V292Z"/>
            <path d="M348 292H408V584H348V292Z"/>
          </svg>
        </div>
        <div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold mb-2"
          >
            ElevenLabs TTS
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-foreground/70"
          >
            Generate natural-sounding speech using ElevenLabs&apos; advanced AI voices
          </motion.p>
        </div>
      </div>

      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex flex-col">
              <label
                htmlFor="text"
                className="block text-sm font-semibold text-facebook-blue"
              >
                Text
              </label>
              <span className="text-xs text-foreground/60 mt-0.5">
                Enter the text you want to convert to speech
              </span>
            </div>
            <span className="text-sm text-foreground/70">
              {formData.text.length} characters
            </span>
          </div>
          <textarea
            id="text"
            rows={4}
            className="w-full px-3 py-2 border border-foreground/10 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-facebook-blue"
            value={formData.text}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, text: e.target.value }))
            }
            required
            placeholder="Enter your text here..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex flex-col mb-2">
              <label
                htmlFor="voice"
                className="block text-sm font-semibold text-facebook-blue"
              >
                Voice
              </label>
              <span className="text-xs text-foreground/60 mt-0.5">
                Choose a voice character
              </span>
            </div>
            <select
              id="voice"
              className="w-full px-3 py-2 border border-foreground/10 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-facebook-blue"
              value={formData.voice}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, voice: e.target.value }))
              }
              disabled={isLoadingVoices}
            >
              {isLoadingVoices ? (
                <option>Loading voices...</option>
              ) : (
                voices.map((voice) => (
                  <option key={voice.voice_id} value={voice.voice_id}>
                    {voice.name} {voice.labels?.accent ? `(${voice.labels.accent} accent)` : ""}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <div className="flex flex-col mb-2">
              <label
                htmlFor="model"
                className="block text-sm font-semibold text-facebook-blue"
              >
                Model
              </label>
              <span className="text-xs text-foreground/60 mt-0.5">
                Select voice model
              </span>
            </div>
            <select
              id="model"
              className="w-full px-3 py-2 border border-foreground/10 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-facebook-blue"
              value={formData.model}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, model: e.target.value }))
              }
            >
              {MODEL_OPTIONS.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name} - {model.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={isLoading || isLoadingVoices}
            className="px-6 py-3 bg-facebook-blue hover:bg-facebook-hover text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium min-w-[200px]"
          >
            {isLoading ? "Generating..." : "Generate Audio"}
          </button>
        </div>
      </motion.form>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400"
          >
            <p>{error}</p>
          </motion.div>
        )}

        {audioUrl && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 p-6 border border-foreground/10 rounded-lg bg-gray-50 dark:bg-gray-900/50"
          >
            <h2 className="text-xl font-semibold mb-4 text-facebook-blue">Generated Audio</h2>
            <audio controls className="w-full mb-4">
              <source src={audioUrl} type="audio/mpeg" />
              <track kind="captions" />
              Your browser does not support the audio element.
            </audio>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleDownload}
                className="px-6 py-3 bg-facebook-blue hover:bg-facebook-hover text-white rounded-lg transition-colors font-medium min-w-[200px]"
              >
                Download Audio
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 