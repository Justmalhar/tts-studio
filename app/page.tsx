"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const MotionDiv = motion.div;

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col p-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-gray-50/20 to-gray-100/20 dark:from-background dark:via-gray-900/20 dark:to-gray-800/20">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC40Ii8+PC9zdmc+')] opacity-20" />
      </div>

      <header className="relative w-full max-w-7xl mx-auto flex justify-between items-center mb-16">
        <h1 className="text-2xl font-bold text-facebook-blue flex items-center gap-2">
          <span>🎙️</span>
          TTS Studio
        </h1>
        <a
          href="https://github.com/Justmalhar/tts-studio"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-foreground/10 text-facebook-blue hover:border-facebook-blue bg-background/50 backdrop-blur-sm transition-all hover:shadow-md text-foreground/80 hover:text-facebook-blue"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="GitHub">
            <title>GitHub</title>
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span>View on GitHub</span>
        </a>
      </header>

      <main className="relative flex-1 flex flex-col items-center justify-center max-w-7xl mx-auto w-full">
        <MotionDiv 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-facebook-blue via-blue-500 to-facebook-blue bg-clip-text text-transparent">
            Text to Speech Studio
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Choose your preferred text-to-speech provider for natural and expressive voice synthesis
          </p>
        </MotionDiv>

        <MotionDiv 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
        >
          {[
            {
              name: "Replicate - Kokoro",
              description: "Advanced text-to-speech model optimized for long-form content, delivering natural intonation and expressive speech with high fidelity output.",
              path: "/replicate",
              logo: (
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1000 1000"
                  className="w-12 h-12"
                  fill="black dark:fill-white"
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
              ),
            },
            {
              name: "OpenAI - TTS",
              description: "State-of-the-art text-to-speech technology offering multiple voices and languages, with customizable speech parameters and high-quality audio outputs.",
              path: "/openai",
              logo: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-12 h-12"
                  fill="black dark:fill-white"
                  role="img"
                  aria-label="OpenAI Logo"
                >
                  <title>OpenAI Logo</title>
                  <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0788 3.8065l-5.8144-3.3591 2.02-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4302-.6954zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
                </svg>
              ),
            },
            {
              name: "ElevenLabs - TTS",
              description: "Professional-grade voice synthesis supporting 32 languages, with advanced customization options perfect for creating natural-sounding content across multiple use cases.",
              path: "/elevenlabs",
              logo: (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 876 876" 
                  className="w-12 h-12"
                  fill="black dark:fill-white"
                  role="img" 
                  aria-label="ElevenLabs Logo"
                >
                  <title>ElevenLabs Logo</title>
                  <path d="M468 292H528V584H468V292Z"/>
                  <path d="M348 292H408V584H348V292Z"/>
                </svg>
              ),
            },
          ].map((provider) => (
            <MotionDiv
              key={provider.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={`/provider${provider.path}`}
                className="group flex flex-col p-6 rounded-xl border border-foreground/10 hover:border-facebook-blue transition-all bg-background/50 hover:bg-gray-hover backdrop-blur-sm shadow-sm hover:shadow-md h-full"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="transition-transform group-hover:scale-110">
                    {provider.logo}
                  </div>
                  <h2 className="text-xl font-semibold text-foreground/90 group-hover:text-facebook-blue">
                    {provider.name}
                  </h2>
                </div>
                <p className="text-foreground/70">{provider.description}</p>
              </Link>
              
            </MotionDiv>
          ))}
        </MotionDiv>
      </main>

      <footer className="relative mt-16 text-center">
        <p className="text-sm text-foreground/60 flex items-center justify-center gap-2">
          Made with ❤️ and AI by 
          <a 
            href="https://x.com/justmalhar" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-1 text-foreground/80 text-facebook-blue hover:text-facebook-blue"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="X/Twitter">
              <title>X/Twitter</title>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            @justmalhar
          </a>
        </p>
      </footer>
    </div>
  );
}
