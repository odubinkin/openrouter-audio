# OpenRouter Audio Skill

OpenRouter Audio is an OpenClaw skill that provides:

- audio transcription (`transcribe`)
- text-to-speech generation (`generate`)

The implementation is a TypeScript CLI bundled into a JavaScript runtime artifact plus a small bash launcher.
This skill was developed as part of the app.simpleclaw.ru project.

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
build/openrouter-audio/openrouter-audio transcribe <audio_file> [--model MODEL] [--prompt PROMPT]
```

Example:

```bash
build/openrouter-audio/openrouter-audio transcribe ./samples/meeting.mp3 --prompt "Summarize key decisions"
```

### Generate

```bash
build/openrouter-audio/openrouter-audio generate <text> [--voice VOICE] [--format FORMAT] [--model MODEL] [--stream true|false] [--dry-run]
```

Examples:

```bash
# default format mp3, stream false
build/openrouter-audio/openrouter-audio generate "Hello from OpenClaw"

# explicit format and voice
build/openrouter-audio/openrouter-audio generate "Welcome" --voice nova --format wav

# dry-run: no API call, only planned tmp output path
build/openrouter-audio/openrouter-audio generate "Test" --dry-run
```

## Defaults and Behavior

- API key source: `OPENROUTER_API_KEY` only
- Default generate format: `mp3`
- Default generate stream mode: `false`
- Generated audio output location: system temporary directory (`tmp`)
- `generate` output: JSON with `paths`, `transcript`, `stream`, `format`

## Supported Values

### Input audio formats (transcribe)

- wav, mp3, aiff, aac, ogg, flac, m4a, pcm16, pcm24

### Output audio formats (generate)

- wav, mp3, flac, opus, pcm16

### Voices

- alloy, echo, fable, onyx, nova, shimmer

## Troubleshooting

### `OPENROUTER_API_KEY is not set`

Set env var and rerun:

```bash
export OPENROUTER_API_KEY="your-api-key"
```

### `No audio data received from API`

- Verify model/voice/format combination
- Retry with `--stream false` (default)
- Check upstream API response/body for provider-side issues

### Wrapper fails with `node: command not found`

Install Node.js 20+ or run with a machine where Node is available.

## Development Quick Check

```bash
npm run build
build/openrouter-audio/openrouter-audio --help
build/openrouter-audio/openrouter-audio generate "smoke" --dry-run
```
