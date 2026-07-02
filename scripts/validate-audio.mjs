import fs from "node:fs";
import path from "node:path";
import { assertSegmentCoverage, splitReadingIntoAudioSegments } from "./audio-text.mjs";

const root = path.resolve(import.meta.dirname, "..");
const readingsPath = path.join(root, "data/readings.json");
const data = JSON.parse(fs.readFileSync(readingsPath, "utf8"));
const failures = [];

for (const reading of data.readings) {
  try {
    const segments = splitReadingIntoAudioSegments(reading);
    assertSegmentCoverage(reading, segments);
    if (segments.length < 2 || segments.length > 10) {
      failures.push(`Week ${reading.week} should use a small number of natural audio chunks, found ${segments.length}.`);
    }
  } catch (error) {
    failures.push(error.message);
  }

  if (!reading.audioSrc) {
    failures.push(`Week ${reading.week} has no audioSrc.`);
    continue;
  }

  const audioPath = path.join(root, reading.audioSrc);
  if (!fs.existsSync(audioPath)) {
    failures.push(`Week ${reading.week} audio file is missing: ${reading.audioSrc}`);
    continue;
  }

  const size = fs.statSync(audioPath).size;
  if (size < 100_000) {
    failures.push(`Week ${reading.week} audio file is too small to be a valid reading MP3: ${reading.audioSrc}`);
  }
}

const expectedCount = data.readings.length;
const mp3Count = fs.readdirSync(path.join(root, "audio")).filter((file) => file.endsWith(".mp3")).length;
if (mp3Count !== expectedCount) {
  failures.push(`Expected ${expectedCount} MP3 files in audio/, found ${mp3Count}.`);
}

if (failures.length > 0) {
  console.error("Audio validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Audio validation passed.");
