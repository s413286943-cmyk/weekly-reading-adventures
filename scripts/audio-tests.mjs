import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";

function page() {
  const elements = new Map();
  const document = {
    getElementById(id) {
      if (!elements.has(id)) elements.set(id, {
        value: "", dataset: {}, classList: { toggle() {} },
        scrollIntoView() {}, addEventListener() {},
      });
      return elements.get(id);
    },
    querySelectorAll: () => [],
  };
  const audio = document.getElementById("readingAudio");
  Object.assign(audio, {
    src: "", currentTime: 0, paused: true, playbackRate: 1, loads: 0,
    getAttribute(name) { return name === "src" ? this.src : null; },
    load() { this.loads++; this.currentTime = 0; this.paused = true; },
  });
  const context = vm.createContext({
    document, localStorage: { getItem: () => null, setItem() {} },
    requestAnimationFrame: (callback) => callback(), console,
  });
  const source = readFileSync(new URL("../app.js", import.meta.url), "utf8");
  vm.runInContext(source.replace(/^init\(\);$/m, ""), context);
  context.readings = JSON.parse(readFileSync(new URL("../data/readings.json", import.meta.url), "utf8"));
  context.glossary = JSON.parse(readFileSync(new URL("../data/glossary.json", import.meta.url), "utf8"));
  vm.runInContext("data = readings; glossaryData = glossary; render();", context);
  audio.currentTime = 12;
  audio.paused = false;
  return { audio, context };
}

test("changing speed preserves current playback", () => {
  const { audio, context } = page();
  vm.runInContext("setSpeed(0.75);", context);
  assert.equal(audio.playbackRate, 0.75);
  assert.equal(audio.currentTime, 12);
  assert.equal(audio.paused, false);
  assert.equal(audio.loads, 1);
});

test("highlighting evidence preserves current playback", () => {
  const { audio, context } = page();
  vm.runInContext("showEvidence(0);", context);
  assert.equal(audio.currentTime, 12);
  assert.equal(audio.paused, false);
  assert.equal(audio.loads, 1);
});

test("changing readings loads the new audio and resets playback", () => {
  const { audio, context } = page();
  vm.runInContext("activeWeek = 2; render();", context);
  assert.equal(audio.src, context.readings.readings[1].audioSrc);
  assert.equal(audio.currentTime, 0);
  assert.equal(audio.paused, true);
  assert.equal(audio.loads, 2);
});
