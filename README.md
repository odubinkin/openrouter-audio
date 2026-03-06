# OpenRouter Audio Skill

OpenRouter Audio is an OpenClaw skill that provides:

- audio transcription (`transcribe`)
- text-to-speech generation (`generate`)

The implementation is a TypeScript CLI bundled into a JavaScript runtime artifact plus a small bash launcher.
This skill was developed as part of the [app.simpleclaw.ru](https://app.simpleclaw.ru) project.

## Repository Layout

- `src/openrouter-audio.ts` - CLI source implementation
- `scripts/build.mjs` - build JS skill artifacts
- `scripts/build-bin.mjs` - optional native binary build
- `SKILL.md` - skill metadata and concise operator-facing notes
- `build/openrouter-audio/` - generated distribution artifacts

## Requirements

- Node.js 20+
- bun 1.3+
- OpenRouter API key in environment:

```bash
export OPENROUTER_API_KEY="your-api-key"
```

## Build

### 1) Default build (recommended)

```bash
npm run build
```

Produces:

- `build/openrouter-audio/openrouter-audio.js`
- `build/openrouter-audio/openrouter-audio`
- `build/openrouter-audio/SKILL.md`

`openrouter-audio` is a bash wrapper that runs `node openrouter-audio.js`.

### 2) Optional native binary build

```bash
npm run build:bin
```

Produces:

- `build/openrouter-audio/openrouter-audio-bin`

Important: this binary is platform-specific (current OS + CPU architecture).

## CLI Commands

### Help

```bash
build/openrouter-audio/openrouter-audio --help
```

### Transcribe

```bash
build/openrouter-audio/openrouter-audio transcribe <audio_file> [--format FORMAT] [--model MODEL] [--prompt PROMPT]
```

Audio-input models currently listed by OpenRouter:
These identifiers are embedded in the CLI help/model list for `transcribe`.

- `google/gemini-2.0-flash-001`
- `google/gemini-2.0-flash-lite-001`
- `google/gemini-2.5-flash`
- `google/gemini-2.5-flash-lite`
- `google/gemini-2.5-flash-lite-preview-09-2025`
- `google/gemini-2.5-pro`
- `google/gemini-2.5-pro-preview`
- `google/gemini-2.5-pro-preview-05-06`
- `google/gemini-3-flash-preview`
- `google/gemini-3-pro-preview`
- `google/gemini-3.1-flash-lite-preview`
- `google/gemini-3.1-pro-preview`
- `google/gemini-3.1-pro-preview-customtools`
- `mistralai/voxtral-small-24b-2507`
- `openai/gpt-4o-audio-preview`
- `openai/gpt-audio`
- `openai/gpt-audio-mini`
- `openrouter/auto`

Example:

```bash
build/openrouter-audio/openrouter-audio transcribe ./samples/meeting.mp3 --prompt "Summarize key decisions" --model openrouter/auto
```

### Generate

```bash
build/openrouter-audio/openrouter-audio generate <text> [--voice VOICE] [--format FORMAT] [--model MODEL] [--prompt PROMPT] [--out PATH] [--dry-run]
```

Audio-output models currently listed by OpenRouter:
These identifiers are embedded in the CLI help/model list for `generate`.

- `openai/gpt-4o-audio-preview`
- `openai/gpt-audio`
- `openai/gpt-audio-mini`

Examples:

```bash
# default format mp3, streaming is implicit
build/openrouter-audio/openrouter-audio generate "Hello from OpenClaw"

# explicit format and voice
build/openrouter-audio/openrouter-audio generate "Welcome" --voice nova --format wav

# explicit output path
build/openrouter-audio/openrouter-audio generate "Welcome" --out ./artifacts/welcome.mp3

# override the default generation prompt
build/openrouter-audio/openrouter-audio generate "Welcome" --prompt "Speak with a calm and clear narration style."

# dry-run: no API call, only planned output path
build/openrouter-audio/openrouter-audio generate "Test" --dry-run
```

## Defaults and Behavior

- API key source: `OPENROUTER_API_KEY` only
- Model override: `--model` is supported for both `transcribe` and `generate`
- Transcribe format: `--format` overrides auto-detection from file extension
- Default transcribe model: `openrouter/auto`
- Default generate model: `openai/gpt-audio-mini`
- Default generate voice: `alloy`
- Default generate format: `mp3`
- Generate API request format is always `pcm16` for compatibility; local conversion is applied for `mp3`, `ogg`, and `wav`
- Generate requests always use `stream: true`
- Generate default prompt text: `Generate audio that speaks exactly the user's content.`
- Generated audio output location: system temporary directory (`tmp`) by default, or `--out PATH` when provided
- If generate returns multiple audio payloads and `--out` is used, additional files are created with numeric suffixes (`-2`, `-3`, ...)
- `generate` output: JSON with `paths`, `transcript`, `format`
- `generate --dry-run`: skips API call and returns planned output path(s)

## Supported Values

### Input audio formats (transcribe)

- wav, mp3, aiff, aac, ogg, flac, m4a, pcm16, pcm24

### Output audio formats (generate)

- wav, mp3, ogg, pcm16

### Voices

- alloy, echo, fable, onyx, nova, shimmer

## Troubleshooting

### `OPENROUTER_API_KEY is not set`

Set env var and rerun:

```bash
export OPENROUTER_API_KEY="your-api-key"
```

Note: `generate --dry-run` does not require the API key.

### `No audio data received from API`

- Verify model/voice/format combination
- Check upstream API response/body for provider-side issues

### Wrapper fails with `node: command not found`

Install Node.js 20+ or run with a machine where Node is available.

## Development Quick Check

```bash
npm run build
build/openrouter-audio/openrouter-audio --help
build/openrouter-audio/openrouter-audio generate "smoke" --dry-run
```

## Testing

Run CLI tests:

```bash
npm run test:cli
```

or:

```bash
npm test
```

What is covered by automated tests:

- help and usage output
- unknown command handling
- argument validation for `transcribe` and `generate`
- `generate --dry-run` JSON contract (`paths`, `transcript`, `format`)
- `--out` path resolution behavior
- validation errors for unsupported voice
- API key and missing-file failure paths for `transcribe`
