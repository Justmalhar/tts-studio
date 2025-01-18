# 🎙️ TTS Studio

> 🔊 Transform text into natural speech with multiple AI providers of your choice - Replicate, OpenAI, ElevenLabs

TTS Studio is a modern web application that converts text into natural-sounding speech using advanced AI models. Powered by models from leading providers like [Replicate](https://replicate.com/), [OpenAI](https://openai.com/), and [ElevenLabs](https://elevenlabs.io/), it offers an intuitive interface for generating high-quality audio from text.

## Demo

![TTS Studio Demo](https://github.com/Justmalhar/tts-studio/blob/main/public/demo.png)

## ✨ Features

- 🚀 **Instant Deployment**: Deploy with a single click using Vercel's seamless platform integration
- 🎯 **Multiple Providers**: Choose from [Replicate (Kokoro)](https://replicate.com/jaaari/kokoro-82m), [OpenAI TTS](https://platform.openai.com/docs/guides/text-to-speech), or [ElevenLabs TTS](https://docs.elevenlabs.io/welcome/introduction) for text-to-speech conversion
- 🗣️ **Rich Voice Selection**: Access a variety of voices across different providers
- ⚡ **Real-time Generation**: Generate audio quickly with advanced AI models
- 💾 **Easy Downloads**: Save generated audio files directly to your device
- 🎛️ **Customization**: Adjust speech speed and other parameters
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Deploy

Deploy **🎙️ TTS Studio** with a single click using Vercel's powerful and scalable environment.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Justmalhar/tts-studio&env=REPLICATE_API_KEY&env=OPENAI_API_KEY&env=ELEVENLABS_API_KEY)

For detailed deployment instructions, check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- API keys from providers you want to use:
  - [Replicate API Key](https://replicate.com/account)
  - [OpenAI API Key](https://platform.openai.com/api-keys)
  - [ElevenLabs API Key](https://elevenlabs.io/api-keys)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Justmalhar/tts-studio.git
   cd tts-studio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Add your API keys to `.env.local`:
   ```env
   REPLICATE_API_KEY=your_replicate_api_key
   OPENAI_API_KEY=your_openai_api_key
   ELEVENLABS_API_KEY=your_elevenlabs_api_key
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser 🎉

## 🛠️ Environment Setup

### Local Development

Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

Add your API keys:
```env
REPLICATE_API_KEY=your_replicate_api_key
OPENAI_API_KEY=your_openai_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
```

### Production Deployment

For Vercel deployment:
1. Go to your project settings
2. Navigate to the Environment Variables section
3. Add the same variables as above
4. Redeploy your application

## 🎯 Usage Guide

1. 🔑 Setup your API keys for the provider you want to use in `.env.local` file or Vercel Environment Variables
2. 📝 Type or paste your text in the input field
3. 🎤 Select a voice from the available options
4. ⚙️ Adjust the speech settings (speed, etc.)
5. 🎵 Click "Generate Audio" to create your speech
6. 💾 Use the player controls or download the audio file

## 🌟 Providers

### Replicate - Kokoro
- Advanced text-to-speech model (82M params)
- Optimized for long-form content
- Multiple voice options
- [Learn more about Kokoro](https://replicate.com/jaaari/kokoro-82m)

### OpenAI TTS
- State-of-the-art TTS technology
- Multiple voices and languages
- High-quality audio output
- [OpenAI TTS Documentation](https://platform.openai.com/docs/guides/text-to-speech)

### ElevenLabs TTS
- Professional-grade voice synthesis
- 32+ languages supported
- Advanced customization options
- [ElevenLabs Documentation](https://docs.elevenlabs.io/welcome/introduction)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- 🎯 [Replicate](https://replicate.com) for the Kokoro model
- 🤖 [OpenAI](https://openai.com) for their TTS API
- 🎤 [ElevenLabs](https://elevenlabs.io) for their voice technology
- 🎨 [Tailwind CSS](https://tailwindcss.com) for the styling
- 🎭 [Framer Motion](https://www.framer.com/motion/) for animations

## Stay Connected
- **Twitter/X**: [@justmalhar](https://twitter.com/justmalhar) 🛠
- **LinkedIn**: [Malhar Ujawane](https://linkedin.com/in/justmalhar) 💻
