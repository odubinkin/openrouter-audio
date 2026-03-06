---
name: openrouter-audio
description: Audio transcription and text-to-speech generation using OpenRouter API. Use when the user needs to transcribe audio files to text or generate speech/audio from text. Supports multiple audio formats for input and output, reads API key from environment, and writes generated audio into system tmp.
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
- Output formats: wav, mp3, flac, opus, pcm16
- Generated files are saved to the system tmp directory
- Returns JSON including generated path(s)
- Model override support (`--model`)
- Available audio-output models are shown in `--help`
- Custom prompt support (`--prompt`)

## Defaults

- Transcription model: `openrouter/auto`
- Generation model: `openai/gpt-audio-mini`
- Generation voice: `alloy`
- Generation format: `pcm16`

## Format Option (`--format`)

- `transcribe`: `--format` sets the input audio format explicitly (otherwise it is inferred from file extension).
- `generate`: `--format` sets the output audio format (default: `pcm16`).
- Transcribe supported input formats: `wav`, `mp3`, `aiff`, `aac`, `ogg`, `flac`, `m4a`, `pcm16`, `pcm24`.
- Generate supported output formats: `wav`, `mp3`, `flac`, `opus`, `pcm16`.

## Usage

```bash
# Help
./openrouter-audio --help

# Transcribe
./openrouter-audio transcribe recording.wav

# Transcribe with custom prompt/model
./openrouter-audio transcribe meeting.mp3 --prompt "Summarize the call" --model openrouter/auto

# Generate with defaults (format=pcm16)
./openrouter-audio generate "Hello world"

# Generate with explicit options and model override
./openrouter-audio generate "Welcome" --voice nova --format wav --model openai/gpt-audio-mini

# Generate with custom prompt override
./openrouter-audio generate "Welcome" --prompt "Speak the exact message text with a calm and clear narration style."
```

## Output Behavior

- `transcribe` prints transcription text to stdout.
- `generate` prints JSON with fields:
  - `paths`: generated file path array in system tmp
  - `transcript`: transcript text (if provided by API)
  - `format`: effective output format
