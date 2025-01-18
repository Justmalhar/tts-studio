"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ALL_VOICE_OPTIONS = {
  standard: [
    { id: "alloy", name: "Alloy", description: "Versatile, balanced voice" },
    { id: "echo", name: "Echo", description: "Warm, natural tone" },
    { id: "fable", name: "Fable", description: "Authoritative, mature voice" },
    { id: "onyx", name: "Onyx", description: "Deep, resonant voice" },
    { id: "nova", name: "Nova", description: "Energetic, bright voice" },
    { id: "shimmer", name: "Shimmer", description: "Clear, gentle voice" },
  ],
  hd: [
    { id: "alloy", name: "Alloy", description: "Versatile, balanced voice" },
    { id: "echo", name: "Echo", description: "Warm, natural tone" },
    { id: "fable", name: "Fable", description: "Authoritative, mature voice" },
    { id: "onyx", name: "Onyx", description: "Deep, resonant voice" },
    { id: "nova", name: "Nova", description: "Energetic, bright voice" },
    { id: "shimmer", name: "Shimmer", description: "Clear, gentle voice" },
    { id: "ash", name: "Ash", description: "Direct, clear voice (HD only)" },
    { id: "coral", name: "Coral", description: "Warm, friendly voice (HD only)" },
    { id: "sage", name: "Sage", description: "Calm, thoughtful voice (HD only)" },
  ],
} as const;

const MODEL_OPTIONS = [
  { id: "tts-1", name: "Standard", description: "Faster, good for real-time" },
  { id: "tts-1-hd", name: "HD", description: "Higher quality audio with more voices" },
] as const;

const FORMAT_OPTIONS = [
  { id: "mp3", name: "MP3", description: "Standard compressed audio" },
  { id: "opus", name: "Opus", description: "Best for streaming" },
  { id: "aac", name: "AAC", description: "High-quality compressed" },
  { id: "flac", name: "FLAC", description: "Lossless audio" },
  { id: "wav", name: "WAV", description: "Uncompressed audio" },
] as const;

type Voice = typeof ALL_VOICE_OPTIONS[keyof typeof ALL_VOICE_OPTIONS][number]["id"];
type Model = typeof MODEL_OPTIONS[number]["id"];
type Format = typeof FORMAT_OPTIONS[number]["id"];

interface FormData {
  text: string;
  speed: number;
  voice: Voice;
  model: Model;
  format: Format;
}

export default function WhisperProvider() {
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    text: "",
    speed: 1,
    voice: "alloy",
    model: "tts-1",
    format: "mp3",
  });

  useEffect(() => {
    const availableVoices = formData.model === "tts-1-hd" 
      ? ALL_VOICE_OPTIONS.hd 
      : ALL_VOICE_OPTIONS.standard;
    
    const isVoiceAvailable = availableVoices.some(v => v.id === formData.voice);
    
    if (!isVoiceAvailable) {
      setFormData(prev => ({
        ...prev,
        voice: "alloy"
      }));
    }
  }, [formData.model, formData.voice]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAudioUrl(null);
    setError(null);
    
    try {
      const response = await fetch("/api/generate/whisper", {
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
    a.download = `generated-audio.${formData.format}`;
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
      <div className="mb-8 flex items-start gap-4">
        <svg 
          viewBox="0 0 24 24"
          className="w-12 h-12 shrink-0" 
          fill="currentColor"
          role="img"
          aria-label="OpenAI Logo"
        >
          <title>OpenAI Logo</title>
          <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.0264 1.1706a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4929 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0264 1.1706a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1302 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0834-3.0089l-.142-.0852-4.7782-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1658a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
        </svg>
        <div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold mb-2"
          >
            OpenAI TTS
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-foreground/70"
          >
            Generate natural-sounding speech using OpenAI&apos;s text-to-speech model
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
                Maximum length is 4096 characters
              </span>
            </div>
            <span className="text-sm text-foreground/70">
              {formData.text.length} / 4096 characters
            </span>
          </div>
          <textarea
            id="text"
            rows={4}
            maxLength={4096}
            className="w-full px-3 py-2 border border-foreground/10 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-facebook-blue"
            value={formData.text}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, text: e.target.value }))
            }
            required
            placeholder="Enter the text you want to convert to speech..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex flex-col mb-2">
              <label
                htmlFor="model"
                className="block text-sm font-semibold text-facebook-blue"
              >
                Model
              </label>
              <span className="text-xs text-foreground/60 mt-0.5">
                Choose audio quality
              </span>
            </div>
            <select
              id="model"
              className="w-full px-3 py-2 border border-foreground/10 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-facebook-blue"
              value={formData.model}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  model: e.target.value as Model,
                }))
              }
            >
              {MODEL_OPTIONS.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name} - {model.description}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex flex-col mb-2">
              <label
                htmlFor="format"
                className="block text-sm font-semibold text-facebook-blue"
              >
                Format
              </label>
              <span className="text-xs text-foreground/60 mt-0.5">
                Audio file format
              </span>
            </div>
            <select
              id="format"
              className="w-full px-3 py-2 border border-foreground/10 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-facebook-blue"
              value={formData.format}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  format: e.target.value as Format,
                }))
              }
            >
              {FORMAT_OPTIONS.map((format) => (
                <option key={format.id} value={format.id}>
                  {format.name} - {format.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex flex-col mb-2">
              <label
                htmlFor="voice"
                className="block text-sm font-semibold text-facebook-blue"
              >
                Voice
              </label>
              <span className="text-xs text-foreground/60 mt-0.5">
                {formData.model === "tts-1-hd" 
                  ? "Select from all available voices" 
                  : "Select a standard voice"}
              </span>
            </div>
            <select
              id="voice"
              className="w-full px-3 py-2 border border-foreground/10 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-facebook-blue"
              value={formData.voice}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  voice: e.target.value as Voice,
                }))
              }
            >
              {(formData.model === "tts-1-hd" 
                ? ALL_VOICE_OPTIONS.hd 
                : ALL_VOICE_OPTIONS.standard
              ).map((voice) => (
                <option key={voice.id} value={voice.id}>
                  {voice.name} - {voice.description}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col">
                <label
                  htmlFor="speed"
                  className="block text-sm font-semibold text-facebook-blue"
                >
                  Speed
                </label>
                <span className="text-xs text-foreground/60 mt-0.5">
                  Speech speed multiplier
                </span>
              </div>
              <span className="text-sm font-semibold text-facebook-blue">
                {formData.speed.toFixed(1)}x
              </span>
            </div>
            <input
              type="range"
              id="speed"
              min={0.25}
              max={4.0}
              step={0.1}
              className="w-full accent-facebook-blue cursor-pointer"
              value={formData.speed}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  speed: Number.parseFloat(e.target.value),
                }))
              }
            />
            <div className="flex justify-between text-xs text-foreground/50 mt-1">
              <span>0.25x</span>
              <span>4.0x</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={isLoading}
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
              <source src={audioUrl} type={`audio/${formData.format}`} />
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