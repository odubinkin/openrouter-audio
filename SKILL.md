---
name: openrouter-audio
description: Audio transcription and text-to-speech generation using OpenRouter API. Use when the user needs to transcribe audio files to text or generate speech/audio from text. Supports multiple audio formats for input and output, reads API key from environment, and writes generated audio to system tmp or an explicit output path.
homepage: https://github.com/odubinkin/openrouter-audio/
metadata:
  {
    "openclaw":
      {
        "emoji": "🔊",
        "requires": { "env": ["OPENROUTER_API_KEY"] },
        "primaryEnv": "OPENROUTER_API_KEY",
      },
  }
---

# OpenRouter Audio

This skill provides audio transcription (speech-to-text) and audio generation (text-to-speech) capabilities using OpenRouter's multimodal API.

## What This Skill Provides

- A CLI utility with two commands: `transcribe` and `generate`
- Runtime usage of a prebuilt skill CLI located at `{baseDir}/openrouter-audio`

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
- If multiple files are produced, additional files use numeric suffixes near the target `--out` path
- Returns JSON including generated path(s)
- Model override support (`--model`)
- Available audio-output models are shown in `--help`
- Custom prompt support (`--prompt`)

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

## Output Path Option (`--out`)

- `generate` without `--out` writes output file(s) to the system tmp directory.
- `generate --out <path>` writes output to your explicit target path.
- If more than one output file is created, additional files use numeric suffixes based on the provided `--out` path.

## Usage

```bash
# Help
{baseDir}/openrouter-audio --help

# Transcribe
{baseDir}/openrouter-audio transcribe recording.wav

# Transcribe with custom prompt/model
{baseDir}/openrouter-audio transcribe meeting.mp3 --prompt "Summarize the call" --model openrouter/auto

# Generate with defaults (recommended, format=mp3)
{baseDir}/openrouter-audio generate "Hello world"

# Generate with explicit options and model override
{baseDir}/openrouter-audio generate "Welcome" --voice nova --format wav --model openai/gpt-audio-mini

# Generate to a specific file path
{baseDir}/openrouter-audio generate "Welcome" --out ./artifacts/welcome.mp3

# Generate with custom prompt override
{baseDir}/openrouter-audio generate "Welcome" --prompt "Speak the exact message text with a calm and clear narration style."
```

## Output Behavior

- `transcribe` prints transcription text to stdout.
- `generate` prints JSON with fields:
  - `paths`: generated file path array (tmp by default, or explicit `--out` path)
  - `transcript`: transcript text (if provided by API)
  - `format`: effective output format
