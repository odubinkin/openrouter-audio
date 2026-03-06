---
name: openrouter-audio
description: Audio transcription and text-to-speech generation using OpenRouter API. Use when the user needs to transcribe audio files to text or generate speech/audio from text. Supports multiple audio formats for input and output, reads API key from environment, and writes generated audio to system tmp or an explicit output path.
---

# OpenRouter Audio

This skill provides audio transcription (speech-to-text) and audio generation (text-to-speech) capabilities using OpenRouter's multimodal API.

## What This Skill Provides

- A CLI utility with two commands: `transcribe` and `generate`
- OpenRouter API integration using `OPENROUTER_API_KEY`
- Runtime usage of a prebuilt skill CLI located at `./openrouter-audio`

## Capabilities

### Transcription
- Input formats: wav, mp3, aiff, aac, ogg, flac, m4a, pcm16, pcm24
- Model override support (`--model`)
- Available audio-input models are shown in `--help`
- Custom prompt support (`--prompt`)

### Audio Generation (TTS)
- Voices: alloy, echo, fable, onyx, nova, shimmer
- Output formats: wav, mp3, ogg, pcm16
- Generated files are saved to system tmp by default, or to `--out` path when provided
- Returns JSON including generated path(s)
- Model override support (`--model`)
- Available audio-output models are shown in `--help`
- Custom prompt support (`--prompt`)
- API request is always sent as `pcm16`; CLI converts to requested output format locally

## Defaults

- Transcription model: `openrouter/auto`
- Generation model: `openai/gpt-audio-mini`
- Generation voice: `alloy`
- Generation format: `mp3`
- Recommended usage: prefer default parameters unless the user explicitly needs overrides

## Format Option (`--format`)

- `transcribe`: `--format` sets the input audio format explicitly (otherwise it is inferred from file extension).
- `generate`: `--format` sets the output audio format (default: `mp3`).
- `generate`: `--out` sets the output file path explicitly.
- Transcribe supported input formats: `wav`, `mp3`, `aiff`, `aac`, `ogg`, `flac`, `m4a`, `pcm16`, `pcm24`.
- Generate supported output formats: `wav`, `mp3`, `ogg`, `pcm16`.

## Usage

```bash
# Help
./openrouter-audio --help

# Transcribe
./openrouter-audio transcribe recording.wav

# Transcribe with custom prompt/model
./openrouter-audio transcribe meeting.mp3 --prompt "Summarize the call" --model openrouter/auto

# Generate with defaults (recommended, format=mp3)
./openrouter-audio generate "Hello world"

# Generate with explicit options and model override
./openrouter-audio generate "Welcome" --voice nova --format wav --model openai/gpt-audio-mini

# Generate to a specific file path
./openrouter-audio generate "Welcome" --out ./artifacts/welcome.mp3

# Generate with custom prompt override
./openrouter-audio generate "Welcome" --prompt "Speak the exact message text with a calm and clear narration style."
```

## Output Behavior

- `transcribe` prints transcription text to stdout.
- `generate` prints JSON with fields:
  - `paths`: generated file path array (tmp by default, or explicit `--out` path)
  - `transcript`: transcript text (if provided by API)
  - `format`: effective output format
