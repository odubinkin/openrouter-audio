#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { extname, join as joinPath, parse as parsePath, resolve as resolvePath } from "node:path";
import os from "node:os";
import { createMp3Encoder, createOggEncoder } from "wasm-media-encoders";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_TRANSCRIBE_MODEL = "openrouter/auto";
const DEFAULT_GENERATE_MODEL = "openai/gpt-audio-mini";
const DEFAULT_GENERATE_PROMPT = "Generate audio that speaks exactly the user's content. NEVER add any additional commentary, explanation, or extra text.";
const DEFAULT_TRANSCRIPT_PROMPT =
  "Transcribe the audio accurately and return only the verbatim transcript. NEVER add any additional commentary, explanation, or extra text.";
const DEFAULT_GENERATE_FORMAT = "mp3";
const PCM16_SAMPLE_RATE = 24_000;
const PCM16_CHANNELS: 1 = 1;
const TRANSCRIBE_MODELS = [
  "google/gemini-2.0-flash-001",
  "google/gemini-2.0-flash-lite-001",
  "google/gemini-2.5-flash",
  "google/gemini-2.5-flash-lite",
  "google/gemini-2.5-flash-lite-preview-09-2025",
  "google/gemini-2.5-pro",
  "google/gemini-2.5-pro-preview",
  "google/gemini-2.5-pro-preview-05-06",
  "google/gemini-3-flash-preview",
  "google/gemini-3-pro-preview",
  "google/gemini-3.1-flash-lite-preview",
  "google/gemini-3.1-pro-preview",
  "google/gemini-3.1-pro-preview-customtools",
  "mistralai/voxtral-small-24b-2507",
  "openai/gpt-4o-audio-preview",
  "openai/gpt-audio",
  "openai/gpt-audio-mini",
  "openrouter/auto",
] as const;
const GENERATE_MODELS = [
  "openai/gpt-4o-audio-preview",
  "openai/gpt-audio",
  "openai/gpt-audio-mini",
] as const;

const SUPPORTED_INPUT_FORMATS = new Set([
  "wav",
  "mp3",
  "aiff",
  "aac",
  "ogg",
  "flac",
  "m4a",
  "pcm16",
  "pcm24",
]);

const SUPPORTED_OUTPUT_FORMATS = new Set(["wav", "mp3", "ogg", "pcm16"]);
const SUPPORTED_VOICES = new Set(["alloy", "echo", "fable", "onyx", "nova", "shimmer"]);

type ParsedArgs = {
  command?: string;
  positional: string[];
  options: Record<string, string | boolean>;
};

type AudioPayload = {
  data: string;
  transcript?: string;
};

function formatModelList(title: string, models: readonly string[]): string {
  return `${title}:\n${models.map((model) => `  - ${model}`).join("\n")}`;
}

function usage(): string {
  return `OpenRouter Audio CLI - Transcribe and generate audio

Usage:
  openrouter.sh transcribe <audio_file> [--format FORMAT] [--model MODEL] [--prompt PROMPT]
  openrouter.sh generate <text> [--voice VOICE] [--format FORMAT] [--model MODEL] [--prompt PROMPT] [--out PATH] [--dry-run]
  openrouter.sh --help

Model option:
  - transcribe accepts --model MODEL (default: ${DEFAULT_TRANSCRIBE_MODEL})
  - generate accepts --model MODEL (default: ${DEFAULT_GENERATE_MODEL})

Environment:
  OPENROUTER_API_KEY  Required OpenRouter API key

Notes:
  - API key is only read from OPENROUTER_API_KEY
  - transcribe infers input format from file extension unless --format is set
  - generate saves output audio to WORKSPACE_DIR/tmp when OpenClaw workspace exists, otherwise system tmp
  - generate default voice is alloy
  - --format defaults to ${DEFAULT_GENERATE_FORMAT}
  - --out writes generated file(s) to your path instead of default tmp selection (additional files use numeric suffixes)
  - --dry-run skips API call and returns planned output path(s)
  - generate always requests pcm16 from API and converts locally for other output formats
  - generate always uses stream=true for audio output

${formatModelList("Transcribe models (OpenRouter audio input)", TRANSCRIBE_MODELS)}

${formatModelList("Generate models (OpenRouter audio output)", GENERATE_MODELS)}
`;
}

function die(message: string): never {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

function parseArgs(argv: string[]): ParsedArgs {
  const positional: string[] = [];
  const options: Record<string, string | boolean> = {};

  let i = 0;
  while (i < argv.length) {
    const token = argv[i];
    if (!token.startsWith("--")) {
      positional.push(token);
      i += 1;
      continue;
    }

    const eq = token.indexOf("=");
    if (eq >= 0) {
      const key = token.slice(2, eq);
      const value = token.slice(eq + 1);
      options[key] = value;
      i += 1;
      continue;
    }

    const key = token.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      options[key] = true;
      i += 1;
      continue;
    }

    options[key] = next;
    i += 2;
  }

  return {
    command: positional[0],
    positional: positional.slice(1),
    options,
  };
}

function getStringOption(options: Record<string, string | boolean>, key: string): string | undefined {
  const value = options[key];
  return typeof value === "string" ? value : undefined;
}

function getApiKey(): string {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    die("Error: OPENROUTER_API_KEY is not set.");
  }
  return apiKey;
}

function getAudioFormatFromPath(audioPath: string): string {
  const ext = extname(audioPath).toLowerCase().replace(".", "");
  if (SUPPORTED_INPUT_FORMATS.has(ext)) {
    return ext;
  }
  return "wav";
}

function resolveInputAudioFormat(audioPath: string, explicitFormat?: string): string {
  if (!explicitFormat) {
    return getAudioFormatFromPath(audioPath);
  }

  const normalizedFormat = explicitFormat.toLowerCase();
  if (!SUPPORTED_INPUT_FORMATS.has(normalizedFormat)) {
    die(`Error: Unsupported transcribe format '${explicitFormat}'. Use: ${Array.from(SUPPORTED_INPUT_FORMATS).join(", ")}`);
  }

  return normalizedFormat;
}

function extractTextContent(content: unknown): string {
  if (typeof content === "string") {
    return content;
  }
  if (!Array.isArray(content)) {
    return "";
  }
  const parts: string[] = [];
  for (const part of content) {
    if (!part || typeof part !== "object") {
      continue;
    }
    const text = (part as { text?: unknown }).text;
    if (typeof text === "string") {
      parts.push(text);
    }
  }
  return parts.join("");
}

async function transcribeAudio(audioPath: string, model?: string, prompt?: string, format?: string): Promise<string> {
  const apiKey = getApiKey();

  if (!existsSync(audioPath)) {
    die(`Error: File not found: ${audioPath}`);
  }

  const audioBytes = readFileSync(audioPath);
  const base64Audio = audioBytes.toString("base64");
  const audioFormat = resolveInputAudioFormat(audioPath, format);

  const payload = {
    model: model ?? DEFAULT_TRANSCRIBE_MODEL,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt ?? DEFAULT_TRANSCRIPT_PROMPT,
          },
          {
            type: "input_audio",
            input_audio: {
              data: base64Audio,
              format: audioFormat,
            },
          },
        ],
      },
    ],
  };

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text();
    die(`Error: API request failed (${response.status}): ${body}`);
  }

  const result = (await response.json()) as {
    choices?: Array<{ message?: { content?: unknown } }>;
  };

  const message = result.choices?.[0]?.message;
  const content = extractTextContent(message?.content);
  if (!content) {
    die("Error: Empty transcription response.");
  }
  return content;
}

function isExistingDirectory(path: string): boolean {
  try {
    return statSync(path).isDirectory();
  } catch {
    return false;
  }
}

function resolveWorkspaceDir(): string | undefined {
  const stateDir = process.env.OPENCLAW_STATE_DIR;
  if (stateDir && isExistingDirectory(stateDir)) {
    return resolvePath(stateDir);
  }

  const profile = process.env.OPENCLAW_PROFILE;
  if (profile) {
    const profileWorkspaceDir = joinPath(os.homedir(), ".openclaw", `workspace-${profile}`);
    if (isExistingDirectory(profileWorkspaceDir)) {
      return profileWorkspaceDir;
    }
  }

  const defaultWorkspaceDir = joinPath(os.homedir(), ".openclaw", "workspace");
  if (isExistingDirectory(defaultWorkspaceDir)) {
    return defaultWorkspaceDir;
  }

  return undefined;
}

function resolveDefaultTmpDir(): string {
  const workspaceDir = resolveWorkspaceDir();
  if (!workspaceDir) {
    return os.tmpdir();
  }

  const workspaceTmpDir = joinPath(workspaceDir, "tmp");
  if (existsSync(workspaceTmpDir) && !isExistingDirectory(workspaceTmpDir)) {
    die(`Error: Expected directory but found non-directory path: ${workspaceTmpDir}`);
  }

  if (!existsSync(workspaceTmpDir)) {
    mkdirSync(workspaceTmpDir, { recursive: true });
  }

  return workspaceTmpDir;
}

function newTmpAudioPath(format: string, index: number, tmpDir: string): string {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const suffix = index > 0 ? `-${index + 1}` : "";
  return joinPath(tmpDir, `openrouter-audio-${id}${suffix}.${format}`);
}

function collectAudioPayloadsFromJson(result: unknown): AudioPayload[] {
  const payloads: AudioPayload[] = [];
  const root = result as {
    choices?: Array<{ message?: { audio?: { data?: unknown; transcript?: unknown }; content?: unknown } }>;
  };

  const message = root.choices?.[0]?.message;
  const directAudio = message?.audio;
  if (directAudio && typeof directAudio.data === "string") {
    payloads.push({
      data: directAudio.data,
      transcript: typeof directAudio.transcript === "string" ? directAudio.transcript : undefined,
    });
  }

  const content = message?.content;
  if (Array.isArray(content)) {
    for (const entry of content) {
      if (!entry || typeof entry !== "object") {
        continue;
      }
      const audioObj = (entry as { audio?: unknown; output_audio?: unknown }).audio ??
        (entry as { output_audio?: unknown }).output_audio;
      if (!audioObj || typeof audioObj !== "object") {
        continue;
      }
      const data = (audioObj as { data?: unknown }).data;
      const transcript = (audioObj as { transcript?: unknown }).transcript;
      if (typeof data === "string") {
        payloads.push({
          data,
          transcript: typeof transcript === "string" ? transcript : undefined,
        });
      }
    }
  }

  return payloads;
}

async function readSseAudioPayloads(response: Response): Promise<AudioPayload[]> {
  if (!response.body) {
    die("Error: Empty streaming response body.");
  }

  const decoder = new TextDecoder();
  const reader = response.body.getReader();
  let buffer = "";

  const chunks: string[] = [];
  const transcriptChunks: string[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) {
        continue;
      }
      const data = trimmed.slice(5).trim();
      if (!data || data === "[DONE]") {
        continue;
      }

      try {
        const parsed = JSON.parse(data) as {
          choices?: Array<{ delta?: { audio?: { data?: unknown; transcript?: unknown } } }>;
        };
        const audio = parsed.choices?.[0]?.delta?.audio;
        if (audio && typeof audio.data === "string") {
          chunks.push(audio.data);
        }
        if (audio && typeof audio.transcript === "string") {
          transcriptChunks.push(audio.transcript);
        }
      } catch {
        // Ignore malformed SSE chunks.
      }
    }
  }

  if (!chunks.length) {
    return [];
  }

  return [
    {
      data: chunks.join(""),
      transcript: transcriptChunks.join("") || undefined,
    },
  ];
}

function pcm16ToFloat32Mono(pcm16Bytes: Buffer): Float32Array {
  const sampleCount = Math.floor(pcm16Bytes.length / 2);
  const samples = new Float32Array(sampleCount);

  for (let i = 0; i < sampleCount; i += 1) {
    const value = pcm16Bytes.readInt16LE(i * 2);
    samples[i] = Math.max(-1, value / 32768);
  }

  return samples;
}

function buildWavHeader(dataLength: number, sampleRate: number, channels: number, bitsPerSample: number): Buffer {
  const header = Buffer.alloc(44);
  const blockAlign = channels * (bitsPerSample / 8);
  const byteRate = sampleRate * blockAlign;

  header.write("RIFF", 0, 4, "ascii");
  header.writeUInt32LE(36 + dataLength, 4);
  header.write("WAVE", 8, 4, "ascii");
  header.write("fmt ", 12, 4, "ascii");
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write("data", 36, 4, "ascii");
  header.writeUInt32LE(dataLength, 40);

  return header;
}

function pcm16ToWavBuffer(pcm16Bytes: Buffer): Buffer {
  const header = buildWavHeader(pcm16Bytes.length, PCM16_SAMPLE_RATE, PCM16_CHANNELS, 16);
  return Buffer.concat([header, pcm16Bytes]);
}

function copyEncodedChunk(chunk: Uint8Array): Buffer {
  return Buffer.from(chunk.slice());
}

async function pcm16ToMp3Buffer(pcm16Bytes: Buffer): Promise<Buffer> {
  const encoder = await createMp3Encoder();
  encoder.configure({
    sampleRate: PCM16_SAMPLE_RATE,
    channels: PCM16_CHANNELS,
    vbrQuality: 4,
  });

  const mono = pcm16ToFloat32Mono(pcm16Bytes);
  const first = copyEncodedChunk(encoder.encode([mono]));
  const last = copyEncodedChunk(encoder.finalize());

  return Buffer.concat([first, last]);
}

async function pcm16ToOggBuffer(pcm16Bytes: Buffer): Promise<Buffer> {
  const encoder = await createOggEncoder();
  encoder.configure({
    sampleRate: PCM16_SAMPLE_RATE,
    channels: PCM16_CHANNELS,
    vbrQuality: 3,
  });

  const mono = pcm16ToFloat32Mono(pcm16Bytes);
  const first = copyEncodedChunk(encoder.encode([mono]));
  const last = copyEncodedChunk(encoder.finalize());

  return Buffer.concat([first, last]);
}

async function convertPcm16ToFormat(pcm16Bytes: Buffer, format: string): Promise<Buffer> {
  if (format === "pcm16") {
    return pcm16Bytes;
  }

  if (format === "wav") {
    return pcm16ToWavBuffer(pcm16Bytes);
  }

  if (format === "mp3") {
    return pcm16ToMp3Buffer(pcm16Bytes);
  }

  if (format === "ogg") {
    return pcm16ToOggBuffer(pcm16Bytes);
  }

  die(`Error: Unsupported format '${format}'. Use: ${Array.from(SUPPORTED_OUTPUT_FORMATS).join(", ")}`);
}

function resolveOutputPaths(format: string, count: number, outPath?: string): string[] {
  if (!outPath) {
    const tmpDir = resolveDefaultTmpDir();
    const paths: string[] = [];
    for (let i = 0; i < count; i += 1) {
      paths.push(newTmpAudioPath(format, i, tmpDir));
    }
    return paths;
  }

  const resolved = resolvePath(outPath);
  if (count <= 1) {
    return [resolved];
  }

  const parsed = parsePath(resolved);
  const paths = [resolved];
  for (let i = 1; i < count; i += 1) {
    const suffix = `-${i + 1}`;
    const candidate = `${parsed.name}${suffix}${parsed.ext}`;
    paths.push(resolvePath(parsed.dir, candidate));
  }
  return paths;
}

async function writeAudioPayloads(
  payloads: AudioPayload[],
  requestedFormat: string,
  outPath?: string,
): Promise<{ paths: string[]; transcript: string }> {
  const resolvedPaths = resolveOutputPaths(requestedFormat, payloads.length, outPath);
  const paths: string[] = [];
  const transcriptParts: string[] = [];

  for (let i = 0; i < payloads.length; i += 1) {
    const payload = payloads[i];
    const pcm16Bytes = Buffer.from(payload.data, "base64");
    const convertedBytes = await convertPcm16ToFormat(pcm16Bytes, requestedFormat);
    const targetPath = resolvedPaths[i];
    writeFileSync(targetPath, convertedBytes);
    paths.push(targetPath);
    if (payload.transcript) {
      transcriptParts.push(payload.transcript);
    }
  }

  return {
    paths,
    transcript: transcriptParts.join(""),
  };
}

async function generateAudio(
  text: string,
  voice: string,
  format: string,
  model?: string,
  prompt?: string,
  outPath?: string,
  dryRun = false,
): Promise<{ paths: string[]; transcript: string; format: string }> {
  if (!SUPPORTED_VOICES.has(voice)) {
    die(`Error: Unsupported voice '${voice}'. Use: ${Array.from(SUPPORTED_VOICES).join(", ")}`);
  }

  if (!SUPPORTED_OUTPUT_FORMATS.has(format)) {
    die(`Error: Unsupported format '${format}'. Use: ${Array.from(SUPPORTED_OUTPUT_FORMATS).join(", ")}`);
  }

  if (dryRun) {
    return {
      paths: resolveOutputPaths(format, 1, outPath),
      transcript: "",
      format,
    };
  }

  const apiKey = getApiKey();

  const payload = {
    model: model ?? DEFAULT_GENERATE_MODEL,
    messages: [
      { role: "user", content: prompt ?? DEFAULT_GENERATE_PROMPT },
      { role: "user", content: text },
    ],
    modalities: ["text", "audio"],
    audio: {
      voice,
      // OpenRouter currently returns audio reliably as pcm16; requesting mp3/ogg here can fail.
      // Keep API response format fixed and convert locally to the user-requested output format.
      format: "pcm16",
    },
    stream: true,
  };

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text();
    die(`Error: API request failed (${response.status}): ${body}`);
  }

  const payloads = await readSseAudioPayloads(response);

  if (!payloads.length) {
    die("Error: No audio data received from API.");
  }

  const result = await writeAudioPayloads(payloads, format, outPath);
  return {
    paths: result.paths,
    transcript: result.transcript,
    format,
  };
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  if (!argv.length || argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(usage());
    return;
  }

  const parsed = parseArgs(argv);

  if (parsed.command === "transcribe") {
    const audioFile = parsed.positional[0];
    if (!audioFile) {
      die("Error: transcribe requires <audio_file>.");
    }

    const model = getStringOption(parsed.options, "model");
    const prompt = getStringOption(parsed.options, "prompt");
    const format = getStringOption(parsed.options, "format");
    const text = await transcribeAudio(audioFile, model, prompt, format);
    process.stdout.write(`${text}\n`);
    return;
  }

  if (parsed.command === "generate") {
    const text = parsed.positional[0];
    if (!text) {
      die("Error: generate requires <text>.");
    }

    const voice = getStringOption(parsed.options, "voice") ?? "alloy";
    const format = (getStringOption(parsed.options, "format") ?? DEFAULT_GENERATE_FORMAT).toLowerCase();
    const model = getStringOption(parsed.options, "model");
    const prompt = getStringOption(parsed.options, "prompt");
    const outPath = getStringOption(parsed.options, "out");
    const dryRun = parsed.options["dry-run"] === true;

    const result = await generateAudio(text, voice, format, model, prompt, outPath, dryRun);
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return;
  }

  die(`Error: Unknown command '${parsed.command ?? ""}'.\n\n${usage()}`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  die(`Error: ${message}`);
});
