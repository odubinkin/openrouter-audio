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

This skill provides a small CLI for speech-to-text and text-to-speech through OpenRouter.

## Main Keys

- `name`: Skill ID used by the runtime.
- `description`: When to use this skill and what it does.
- `homepage`: Project/source reference.
- `metadata.openclaw.emoji`: Visual marker for this skill.
- `metadata.openclaw.requires.env`: Required environment variables.
- `metadata.openclaw.primaryEnv`: Primary variable to check first (`OPENROUTER_API_KEY`).

## Core Behavior

- Command path: `{baseDir}/openrouter-audio`
- Main commands: `transcribe`, `generate`
- API key source: `OPENROUTER_API_KEY` only
- `generate` output: system tmp by default, or explicit path via `--out`

## Defaults (Recommended)

Use defaults unless the user explicitly asks for overrides:
- Transcribe model: `openrouter/auto`
- Generate model: `openai/gpt-audio-mini`
- Generate voice: `alloy`
- Generate format: `mp3`

## Models and Formats

Do not hardcode long model/format inventories in prompts.  
Always check current supported values via CLI help:

```bash
{baseDir}/openrouter-audio --help
```

## Usage

```bash
# Full help (models, formats, options)
{baseDir}/openrouter-audio --help

# Transcribe from a local file
{baseDir}/openrouter-audio transcribe recording.wav

# Generate with defaults (recommended)
{baseDir}/openrouter-audio generate "Hello world"

# Generate to an explicit output path
{baseDir}/openrouter-audio generate "Welcome" --out ./artifacts/welcome.mp3
```

## Output Behavior

- `transcribe` prints transcript text to stdout.
- `generate` prints JSON with:
  - `paths` (generated audio file path(s))
  - `transcript` (when available)
  - `format` (final output format)
