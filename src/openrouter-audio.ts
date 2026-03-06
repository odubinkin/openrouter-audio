#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { extname } from "node:path";
import os from "node:os";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_TRANSCRIBE_MODEL = "google/gemini-2.5-flash";
const DEFAULT_GENERATE_MODEL = "openai/gpt-4o-audio-preview";

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

const SUPPORTED_OUTPUT_FORMATS = new Set(["wav", "mp3", "flac", "opus", "pcm16"]);
const SUPPORTED_VOICES = new Set(["alloy", "echo", "fable", "onyx", "nova", "shimmer"]);

type ParsedArgs = {
  command?: string;
  positional: string[];
  options: Record<string, string | boolean>;
};

function usage(): string {
  return `OpenRouter Audio CLI - Transcribe and generate audio

Usage:
  openrouter-audio transcribe <audio_file> [--model MODEL] [--prompt PROMPT]
  openrouter-audio generate <text> [--voice VOICE] [--format FORMAT] [--model MODEL] [--stream true|false]
  openrouter-audio --help

Environment:
  OPENROUTER_API_KEY  Required OpenRouter API key

Notes:
  - API key is only read from OPENROUTER_API_KEY
  - generate saves output audio to system tmp and returns path(s)
  - --format defaults to mp3
  - --stream defaults to false
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

function getBooleanOption(
  options: Record<string, string | boolean>,
  key: string,
  fallback: boolean,
): boolean {
  const value = options[key];
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value !== "string") {
    return fallback;
  }
  const normalized = value.toLowerCase();
  if (normalized === "true" || normalized === "1" || normalized === "yes") {
    return true;
  }
  if (normalized === "false" || normalized === "0" || normalized === "no") {
    return false;
  }
  die(`Error: Invalid boolean value for --${key}: ${value}`);
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

async function transcribeAudio(audioPath: string, model?: string, prompt?: string): Promise<string> {
  const apiKey = getApiKey();

  if (!existsSync(audioPath)) {
    die(`Error: File not found: ${audioPath}`);
  }

  const audioBytes = readFileSync(audioPath);
  const base64Audio = audioBytes.toString("base64");
  const audioFormat = getAudioFormatFromPath(audioPath);

  const payload = {
    model: model ?? DEFAULT_TRANSCRIBE_MODEL,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt ?? "Please transcribe this audio file accurately.",
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

function newTmpAudioPath(format: string, index: number): string {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const suffix = index > 0 ? `-${index + 1}` : "";
  return `${os.tmpdir()}/openrouter-audio-${id}${suffix}.${format}`;
}

type AudioPayload = {
  data: string;
  transcript?: string;
};

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

function writeAudioPayloadsToTmp(payloads: AudioPayload[], format: string): { paths: string[]; transcript: string } {
  const paths: string[] = [];
  const transcriptParts: string[] = [];

  for (let i = 0; i < payloads.length; i += 1) {
    const payload = payloads[i];
    const outPath = newTmpAudioPath(format, i);
    const bytes = Buffer.from(payload.data, "base64");
    writeFileSync(outPath, bytes);
    paths.push(outPath);
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
  stream = false,
  dryRun = false,
): Promise<{ paths: string[]; transcript: string; stream: boolean; format: string }> {
  if (!SUPPORTED_VOICES.has(voice)) {
    die(`Error: Unsupported voice '${voice}'. Use: ${Array.from(SUPPORTED_VOICES).join(", ")}`);
  }

  if (!SUPPORTED_OUTPUT_FORMATS.has(format)) {
    die(`Error: Unsupported format '${format}'. Use: ${Array.from(SUPPORTED_OUTPUT_FORMATS).join(", ")}`);
  }

  if (dryRun) {
    return {
      paths: [newTmpAudioPath(format, 0)],
      transcript: "",
      stream,
      format,
    };
  }

  const apiKey = getApiKey();

  const payload = {
    model: model ?? DEFAULT_GENERATE_MODEL,
    messages: [{ role: "user", content: text }],
    modalities: ["text", "audio"],
    audio: {
      voice,
      format,
    },
    stream,
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

  const payloads = stream
    ? await readSseAudioPayloads(response)
    : collectAudioPayloadsFromJson(await response.json());

  if (!payloads.length) {
    die("Error: No audio data received from API.");
  }

  const result = writeAudioPayloadsToTmp(payloads, format);
  return {
    paths: result.paths,
    transcript: result.transcript,
    stream,
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
    const text = await transcribeAudio(audioFile, model, prompt);
    process.stdout.write(`${text}\n`);
    return;
  }

  if (parsed.command === "generate") {
    const text = parsed.positional[0];
    if (!text) {
      die("Error: generate requires <text>.");
    }

    const voice = getStringOption(parsed.options, "voice") ?? "alloy";
    const format = (getStringOption(parsed.options, "format") ?? "mp3").toLowerCase();
    const model = getStringOption(parsed.options, "model");
    const stream = getBooleanOption(parsed.options, "stream", false);
    const dryRun = getBooleanOption(parsed.options, "dry-run", false);

    const result = await generateAudio(text, voice, format, model, stream, dryRun);
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return;
  }

  die(`Error: Unknown command '${parsed.command ?? ""}'.\n\n${usage()}`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  die(`Error: ${message}`);
});
