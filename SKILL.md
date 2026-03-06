---
name: openrouter-audio
description: Audio transcription and text-to-speech generation using OpenRouter API. Use when the user needs to transcribe audio files to text or generate speech/audio from text. Supports multiple audio formats for input (wav, mp3, flac, etc.) and output (wav, mp3, opus, etc.). Includes multiple voice options for TTS.
---

# OpenRouter Audio

This skill provides audio transcription (speech-to-text) and audio generation (text-to-speech) capabilities using OpenRouter's multimodal API.

## Capabilities

### Audio Input (Transcription)
- Transcribe audio files to text
- Support for formats: wav, mp3, aiff, aac, ogg, flac, m4a, pcm16, pcm24
- Custom prompts for specific transcription needs (summarization, translation, etc.)

### Audio Output (TTS)
- Generate speech from text
- Multiple voices: alloy, echo, fable, onyx, nova, shimmer
- Output formats: wav, mp3, flac, opus, pcm16
- Output files are always written into the default system temporary directory

## Build and Artifacts

Build the skill package:

```bash
npm run build
```

Build output:

- `build/openrouter-audio/openrouter-audio` (compiled CLI executable via bun)
- `build/openrouter-audio/SKILL.md`

No additional system dependencies are required to run the built CLI artifact.

## Environment

Set your OpenRouter API key:

```bash
export OPENROUTER_API_KEY="your-api-key"
```

The CLI reads API key only from `OPENROUTER_API_KEY`.

## CLI Usage

```bash
# Help
build/openrouter-audio/openrouter-audio --help

# Transcribe audio
build/openrouter-audio/openrouter-audio transcribe recording.wav

# Transcribe with custom prompt
build/openrouter-audio/openrouter-audio transcribe meeting.mp3 --prompt "Summarize this meeting"

# Generate audio (saved to system tmp, returns path)
build/openrouter-audio/openrouter-audio generate "Hello world"

# Generate with custom voice/format
build/openrouter-audio/openrouter-audio generate "Welcome" --voice nova --format wav
```

## Defaults

- Transcription model: `google/gemini-2.5-flash`
- Generation model: `openai/gpt-4o-audio-preview`
- Generate `--format`: `mp3`
- Generate `--stream`: `false`

## Notes

- The generate command returns JSON with generated file path(s) in tmp.
- For very large inputs, split text/audio into smaller chunks if needed.
