import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { assertSegmentCoverage, splitReadingIntoAudioSegments } from "./audio-text.mjs";

const root = path.resolve(import.meta.dirname, "..");
const readingsPath = path.join(root, "data/readings.json");

const apiKey = process.env.OPENAI_API_KEY || "";
const baseUrl = (process.env.OPENAI_BASE_URL || "https://api.openai.com").replace(/\/+$/, "");
const model = process.env.TTS_MODEL || "gpt-4o-mini-tts";
const voice = process.env.TTS_VOICE || "coral";
const speed = Number(process.env.TTS_SPEED || "0.88");
const chunkPauseSeconds = Number(process.env.TTS_CHUNK_PAUSE || "0.7");
const retryStatuses = new Set([429, 500, 502, 503, 504]);

if (!apiKey) {
  throw new Error("OPENAI_API_KEY is required.");
}

const data = JSON.parse(await fs.readFile(readingsPath, "utf8"));
const endpoint = `${baseUrl}/v1/audio/speech`;

async function generateSpeechSegment(segment, outputPath) {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        voice,
        input: segment.text,
        response_format: "mp3",
        speed
      })
    });

    if (response.ok) {
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length < 512) {
        throw new Error(`${segment.label} TTS response was too small to be audio.`);
      }
      await fs.writeFile(outputPath, bytes);
      return;
    }

    const detail = await response.text();
    if (retryStatuses.has(response.status) && attempt < 3) {
      await wait(800 * attempt);
      continue;
    }

    throw new Error(`${segment.label} TTS failed with HTTP ${response.status}: ${detail.slice(0, 500)}`);
  }
}

async function generateReading(reading) {
  const outputPath = path.join(root, reading.audioSrc);
  const tmpPath = `${outputPath}.tmp.mp3`;
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), `wra-week-${reading.week}-`));
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  try {
    const segments = splitReadingIntoAudioSegments(reading);
    assertSegmentCoverage(reading, segments);
    console.log(`Generating Week ${reading.week}: ${segments.length} natural reading chunks`);

    const silencePath = path.join(tempDir, "chunk-pause.mp3");
    await createSilenceMp3(silencePath, chunkPauseSeconds);

    const concatPaths = [];
    for (const [index, segment] of segments.entries()) {
      const segmentPath = path.join(tempDir, `chunk-${String(index + 1).padStart(2, "0")}.mp3`);
      await generateSpeechSegment(segment, segmentPath);
      concatPaths.push(segmentPath);
      if (index < segments.length - 1) {
        concatPaths.push(silencePath);
      }
    }

    await concatMp3(concatPaths, tmpPath);
    const outputStats = await fs.stat(tmpPath);
    if (outputStats.size < 100_000) {
      throw new Error(`Week ${reading.week} merged audio was too small to be valid.`);
    }

    await fs.rename(tmpPath, outputPath);
    console.log(`Generated Week ${reading.week}: ${segments.length} natural reading chunks -> ${reading.audioSrc} (${outputStats.size} bytes)`);
  } finally {
    await fs.rm(tmpPath, { force: true });
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

async function createSilenceMp3(outputPath, durationSeconds) {
  await runFfmpeg([
    "-hide_banner",
    "-loglevel", "error",
    "-y",
    "-f", "lavfi",
    "-i", "anullsrc=r=24000:cl=mono",
    "-t", String(durationSeconds),
    "-codec:a", "libmp3lame",
    "-b:a", "96k",
    outputPath
  ]);
}

async function concatMp3(inputPaths, outputPath) {
  const listPath = path.join(path.dirname(inputPaths[0]), "concat.txt");
  await fs.writeFile(listPath, inputPaths.map((filePath) => `file '${filePath.replaceAll("'", "'\\''")}'`).join("\n"));

  await runFfmpeg([
    "-hide_banner",
    "-loglevel", "error",
    "-y",
    "-f", "concat",
    "-safe", "0",
    "-i", listPath,
    "-ac", "1",
    "-ar", "24000",
    "-b:a", "128k",
    "-f", "mp3",
    outputPath
  ]);
}

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const child = spawn("ffmpeg", args, { stdio: ["ignore", "ignore", "pipe"] });
    let stderr = "";

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`ffmpeg failed with code ${code}: ${stderr}`));
      }
    });
  });
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

for (const reading of data.readings) {
  await generateReading(reading);
}
