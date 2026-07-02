import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const requiredFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "data/readings.json",
  "data/glossary.json"
];

const failures = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    failures.push(`Missing required file: ${file}`);
  }
}

const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
if (!index.includes('type="module" src="app.js"')) {
  failures.push("index.html must load app.js as a module.");
}
if (!index.includes('href="styles.css"')) {
  failures.push("index.html must load styles.css.");
}
const readingIndex = index.indexOf('class="reading-workspace"');
const weekStripIndex = index.indexOf('class="week-strip"');
if (!(weekStripIndex >= 0 && readingIndex > weekStripIndex)) {
  failures.push("index.html must present the compact week strip before the reading workspace.");
}
if (index.includes('class="step-rail"') || index.includes('class="week-rail"')) {
  failures.push("index.html should not use the old side-rail layout for the simplified reading resource.");
}

const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");
for (const required of ["stepTitles", "First listen", "Shadow reading", "Next-day review", "data/readings.json", "data/glossary.json"]) {
  if (!app.includes(required)) {
    failures.push(`app.js missing expected seven-step UI content: ${required}`);
  }
}
for (const required of ["flipCard", "data-evidence", "evidence-highlight", "No writing is needed", "翻参考答案"]) {
  if (!app.includes(required)) {
    failures.push(`app.js missing expected oral/flip/evidence interaction: ${required}`);
  }
}

const visibleUiSource = [
  app,
  styles,
  index
].join("\n");
for (const forbidden of ["data-note", "data-check-note", "data-add-term", "Add to notes", "<textarea", "textarea"]) {
  if (visibleUiSource.includes(forbidden)) {
    failures.push(`Site still contains removed writing/notes UI: ${forbidden}`);
  }
}
for (const required of [".week-strip", ".support-area", ".resource-details", ".story-text", ".audio-panel"]) {
  if (!styles.includes(required)) {
    failures.push(`styles.css missing expected simplified reading resource rule: ${required}`);
  }
}

for (const required of ["暑假阅读资源", "选择周次", "听一听", "原文阅读", "生词词典", "阅读检查", "七步流程"]) {
  if (!index.includes(required)) {
    failures.push(`index.html missing bilingual UI label: ${required}`);
  }
}

for (const oldCopy of ["听读工作台", "Audio practice", "steps done"]) {
  if (visibleUiSource.includes(oldCopy)) {
    failures.push(`Simplified site still contains old workbench copy: ${oldCopy}`);
  }
}

if (failures.length > 0) {
  console.error("Site validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Site validation passed.");
