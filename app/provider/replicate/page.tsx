"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VOICE_OPTIONS = {
  female: [
    { id: "af", name: "Alice (Default)" },
    { id: "af_bella", name: "Bella" },
    { id: "af_sarah", name: "Sarah" },
    { id: "bf_emma", name: "Emma" },
    { id: "bf_isabella", name: "Isabella" },
    { id: "af_nicole", name: "Nicole" },
    { id: "af_sky", name: "Sky" },
  ],
  male: [
    { id: "am_adam", name: "Adam (Default)" },
    { id: "am_michael", name: "Michael" },
    { id: "bm_george", name: "George" },
    { id: "bm_lewis", name: "Lewis" },
  ],
} as const;

type Gender = keyof typeof VOICE_OPTIONS;
type Voice = typeof VOICE_OPTIONS[Gender][number]["id"];

interface FormData {
  text: string;
  speed: number;
  voice: Voice;
  gender: Gender;
}

export default function KokoroProvider() {
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    text: "",
    speed: 1,
    voice: "af",
    gender: "female",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAudioUrl(null);
    setError(null);
    
    try {
      const response = await fetch("/api/generate/kokoro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: formData.text,
          speed: formData.speed,
          voice: formData.voice,
        }),
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
    a.download = "generated-audio.wav";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleGenderChange = (gender: Gender) => {
    const defaultVoice = VOICE_OPTIONS[gender][0].id;
    setFormData((prev) => ({
      ...prev,
      gender,
      voice: defaultVoice,
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4"
    >
      <div className="mb-8 mt-4 flex items-start gap-4">
        <svg 
          version="1.1" 
          xmlns="http://www.w3.org/2000/svg" 
          xmlnsXlink="http://www.w3.org/1999/xlink" 
          viewBox="0 0 1000 1000" 
          className="w-12 h-12 shrink-0" 
          fill="currentColor" 
          xmlSpace="preserve"
          role="img"
          aria-label="Replicate Logo"
        >
          <title>Replicate Logo</title>
          <g>
            <polygon points="1000,427.6 1000,540.6 603.4,540.6 603.4,1000 477,1000 477,427.6" />
            <polygon points="1000,213.8 1000,327 364.8,327 364.8,1000 238.4,1000 238.4,213.8" />
            <polygon points="1000,0 1000,113.2 126.4,113.2 126.4,1000 0,1000 0,0" />
          </g>
        </svg>
        <div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold mb-2"
          >
            Replicate Kokoro
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-foreground/70"
          >
            Generate natural-sounding speech using the Kokoro model
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
                Long text is automatically split into smaller chunks
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
            placeholder="Enter the text you want to convert to speech..."
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="flex flex-col mb-2">
              <label
                htmlFor="gender"
                className="block text-sm font-semibold text-facebook-blue"
              >
                Gender
              </label>
              <span className="text-xs text-foreground/60 mt-0.5">
                Voice type
              </span>
            </div>
            <select
              id="gender"
              className="w-full px-3 py-2 border border-foreground/10 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-facebook-blue"
              value={formData.gender}
              onChange={(e) => handleGenderChange(e.target.value as Gender)}
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>

          <div>
            <div className="flex flex-col mb-2">
              <label
                htmlFor="voice"
                className="block text-sm font-semibold text-facebook-blue"
              >
                Voice
              </label>
              <span className="text-xs text-foreground/60 mt-0.5">
                Character
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
              {VOICE_OPTIONS[formData.gender].map((voice) => (
                <option key={voice.id} value={voice.id}>
                  {voice.name}
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
              min={0.1}
              max={5}
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
              <span>0.1x</span>
              <span>5.0x</span>
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
              <source src={audioUrl} type="audio/wav" />
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