import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dataPath = path.join(root, "data", "readings.json");
const glossaryPath = path.join(root, "data", "glossary.json");
const raw = fs.readFileSync(dataPath, "utf8");
const data = JSON.parse(raw);
const glossary = JSON.parse(fs.readFileSync(glossaryPath, "utf8"));

const wordPattern = /[A-Za-z]+(?:['-][A-Za-z]+)?|\d+/g;
const cjkPattern = /[\u3400-\u9fff\uf900-\ufaff]/;

function countWords(paragraphs) {
  return paragraphs.join(" ").match(wordPattern)?.length ?? 0;
}

function fail(message) {
  failures.push(message);
}

const failures = [];

if (data.project !== "weekly-reading-adventures") {
  fail("Project id must be weekly-reading-adventures.");
}

if (data.scheduleStartDate !== "2026-07-06") {
  fail("scheduleStartDate must be 2026-07-06 for week one.");
}

if (!Array.isArray(data.standardInstructions) || data.standardInstructions.length !== 7) {
  fail("standardInstructions must contain the seven listening/reading steps.");
}

for (const instruction of data.standardInstructions ?? []) {
  if (!instruction.en || !instruction.zh) {
    fail(`Instruction step ${instruction.step ?? "unknown"} must include English and Chinese text.`);
  }
}

if (!Array.isArray(data.readings) || data.readings.length !== 8) {
  fail("There must be exactly 8 readings.");
}

const genres = new Set();
const glossaryWeeks = new Map((glossary.weeks ?? []).map((item) => [item.week, item.entries]));

for (const reading of data.readings ?? []) {
  const label = `Week ${reading.week}: ${reading.title}`;
  genres.add(reading.genre);
  const entries = glossaryWeeks.get(reading.week);

  if (!Array.isArray(entries) || entries.length < 6) {
    fail(`${label} must include at least 6 glossary entries.`);
  } else {
    for (const entry of entries) {
      if (!entry.term || !entry.definition || !entry.zh || !entry.example) {
        fail(`${label} glossary entries must include term, definition, zh, and example.`);
      }
    }
  }

  if (!reading.audioSrc?.startsWith("audio/week-")) {
    fail(`${label} must include an audio placeholder path.`);
  }

  if (!Array.isArray(reading.paragraphs) || reading.paragraphs.length < 3) {
    fail(`${label} must include at least 3 paragraphs.`);
    continue;
  }

  const actualWordCount = countWords(reading.paragraphs);
  if (reading.wordCount !== actualWordCount) {
    fail(`${label} wordCount is ${reading.wordCount}, expected ${actualWordCount}.`);
  }

  if (actualWordCount < 250 || actualWordCount > 320) {
    fail(`${label} has ${actualWordCount} words; expected 250-320.`);
  }

  for (const [index, paragraph] of reading.paragraphs.entries()) {
    if (cjkPattern.test(paragraph)) {
      fail(`${label} paragraph ${index + 1} contains Chinese characters; body text must stay English-only.`);
    }
  }

  if (!Array.isArray(reading.questions) || reading.questions.length !== 4) {
    fail(`${label} must include exactly 4 quick-check questions.`);
  }

  if (!reading.retellPrompt?.en || !reading.retellPrompt?.zh) {
    fail(`${label} must include bilingual retell prompts.`);
  }
}

if (genres.size !== 8) {
  fail(`Genres must be distinct; found ${genres.size} unique genres.`);
}

if (failures.length > 0) {
  console.error("Content validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Content validation passed.");
for (const reading of data.readings) {
  console.log(`Week ${reading.week}: ${reading.title} (${reading.wordCount} words, ${reading.genre})`);
}
