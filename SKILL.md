---
name: openrouter-audio
description: Audio transcription and text-to-speech generation using OpenRouter API. Use when the user needs to transcribe audio files to text or generate speech/audio from text. Supports multiple audio formats for input and output, reads API key from environment, and writes generated audio into system tmp.
---

# OpenRouter Audio

This skill provides audio transcription (speech-to-text) and audio generation (text-to-speech) capabilities using OpenRouter's multimodal API.

## What This Skill Provides

- A CLI utility with two commands: `transcribe` and `generate`
- OpenRouter API integration using `OPENROUTER_API_KEY`
- Build artifacts suitable for OpenClaw skill packaging in `build/openrouter-audio/`

## Capabilities

### Transcription
- Input formats: wav, mp3, aiff, aac, ogg, flac, m4a, pcm16, pcm24
- Custom prompt support (`--prompt`)
- Model override support (`--model`)
- Available audio-input models are shown in `--help`

### Audio Generation (TTS)
- Voices: alloy, echo, fable, onyx, nova, shimmer
- Output formats: wav, mp3, flac, opus, pcm16
- Generated files are saved to the system tmp directory
- Returns JSON including generated path(s)
- Available audio-output models are shown in `--help`

## Defaults

- Transcription model: `openrouter/auto`
- Generation model: `openai/gpt-audio-mini`
- Generation voice: `alloy`
- Generation format: `pcm16`
- Generation requests always use `stream: true`
- Generation prompt default: `Generate audio that speaks exactly the user's content.`

## Build

Build JS CLI artifacts:

```bash
npm run build
```

Output:

- `build/openrouter-audio/openrouter-audio.js` (JS CLI bundle)
- `build/openrouter-audio/openrouter-audio` (bash wrapper launcher)
- `build/openrouter-audio/SKILL.md`

Optional native binary build for current OS/CPU:

```bash
npm run build:bin
```

Output:

- `build/openrouter-audio/openrouter-audio-bin`

## Environment

Set API key before running commands:

```bash
export OPENROUTER_API_KEY="your-api-key"
```

No CLI option exists for API key input.
Exception: `generate --dry-run` skips API calls and does not require the key.

## Usage

```bash
# Help
build/openrouter-audio/openrouter-audio --help

# Transcribe
build/openrouter-audio/openrouter-audio transcribe recording.wav

# Transcribe with custom prompt/model
build/openrouter-audio/openrouter-audio transcribe meeting.mp3 --prompt "Summarize the call" --model openrouter/auto

# Generate with defaults (format=pcm16, streaming is implicit)
build/openrouter-audio/openrouter-audio generate "Hello world"

# Generate with explicit options and model override
build/openrouter-audio/openrouter-audio generate "Welcome" --voice nova --format wav --model openai/gpt-audio-mini

# Generate with custom prompt override
build/openrouter-audio/openrouter-audio generate "Welcome" --prompt "Speak with a calm and clear narration style."

# Generate dry-run (no API call)
build/openrouter-audio/openrouter-audio generate "Test" --dry-run
```

## Output Behavior

- `transcribe` prints transcription text to stdout.
- `generate` prints JSON with fields:
  - `paths`: generated file path array in system tmp
  - `transcript`: transcript text (if provided by API)
  - `format`: effective output format

## Notes

- `--dry-run` is supported for `generate` and returns expected tmp output path(s) without API call.
- If required env var is missing, the CLI exits with an error.
- `--help` includes the current OpenRouter audio-input and audio-output model identifiers used for `--model`.
- Embedded model lists come from constants in `src/openrouter-audio.ts`.
- `generate` supports `--prompt` to override the default prompt text.
