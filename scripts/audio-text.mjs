const sentenceSegmenter = typeof Intl !== "undefined" && Intl.Segmenter
  ? new Intl.Segmenter("en", { granularity: "sentence" })
  : null;

export function normalizeSourceText(text) {
  return text.replace(/\s+/g, " ").trim();
}

export function sourceTextForReading(reading) {
  return normalizeSourceText(reading.paragraphs.join(" "));
}

export function splitReadingIntoSourceSegments(reading) {
  return reading.paragraphs.flatMap((paragraph, paragraphIndex) => {
    const normalized = normalizeSourceText(paragraph);
    if (!normalized) return [];

    const sentences = sentenceSegmenter
      ? Array.from(sentenceSegmenter.segment(normalized), (segment) => segment.segment.trim()).filter(Boolean)
      : fallbackSplit(normalized);

    return sentences.map((text, sentenceIndex) => ({
      label: `Week ${reading.week} P${paragraphIndex + 1} S${sentenceIndex + 1}`,
      text
    }));
  });
}

export function splitReadingIntoAudioSegments(reading, minimumWords = 34) {
  const segments = [];
  let pending = [];
  let pendingStart = 0;
  let pendingWords = 0;

  reading.paragraphs.forEach((paragraph, index) => {
    const normalized = normalizeSourceText(paragraph);
    if (!normalized) return;

    if (pending.length === 0) {
      pendingStart = index;
    }

    pending.push(normalized);
    pendingWords += countWords(normalized);

    if (pendingWords >= minimumWords) {
      segments.push(segmentFromPending(reading.week, pendingStart, index, pending));
      pending = [];
      pendingWords = 0;
    }
  });

  if (pending.length > 0) {
    if (segments.length > 0 && pendingWords < minimumWords) {
      const previous = segments[segments.length - 1];
      previous.text = `${previous.text}\n\n${pending.join("\n\n")}`;
      previous.endIndex = reading.paragraphs.length - 1;
      previous.label = labelForRange(reading.week, previous.startIndex, previous.endIndex);
    } else {
      segments.push(segmentFromPending(reading.week, pendingStart, reading.paragraphs.length - 1, pending));
    }
  }

  return segments;
}

export function assertSegmentCoverage(reading, segments) {
  const source = sourceTextForReading(reading);
  const segmented = normalizeSourceText(segments.map((segment) => segment.text).join(" "));
  if (source !== segmented) {
    throw new Error(`Week ${reading.week} sentence split does not exactly cover the source text.`);
  }
}

function segmentFromPending(week, startIndex, endIndex, paragraphs) {
  return {
    label: labelForRange(week, startIndex, endIndex),
    startIndex,
    endIndex,
    text: paragraphs.join("\n\n")
  };
}

function labelForRange(week, startIndex, endIndex) {
  const range = startIndex === endIndex
    ? `P${startIndex + 1}`
    : `P${startIndex + 1}-P${endIndex + 1}`;
  return `Week ${week} ${range}`;
}

function countWords(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

function fallbackSplit(text) {
  const abbreviations = ["Mr.", "Mrs.", "Ms.", "Dr.", "St.", "Aunt."];
  let protectedText = text;
  abbreviations.forEach((abbreviation, index) => {
    protectedText = protectedText.replaceAll(abbreviation, `__ABBR_${index}__`);
  });

  return protectedText
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => {
      let restored = sentence;
      abbreviations.forEach((abbreviation, index) => {
        restored = restored.replaceAll(`__ABBR_${index}__`, abbreviation);
      });
      return restored.trim();
    })
    .filter(Boolean);
}
