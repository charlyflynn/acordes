const noteNames = [
  "C",
  "C#/Db",
  "D",
  "D#/Eb",
  "E",
  "F",
  "F#/Gb",
  "G",
  "G#/Ab",
  "A",
  "A#/Bb",
  "B",
];

const noteNames2 = [
  ["C"],
  ["C#", "Db"],
  ["D"],
  ["D#", "Eb"],
  ["E"],
  ["F"],
  ["F#", "Gb"],
  ["G"],
  ["G#", "Ab"],
  ["A"],
  ["A#", "Bb"],
  ["B"],
];

type tMidiId = number;
type tNoteArray = boolean[];
type tNoteIndices = number[];

export const convertMidiIdToNote = (midiId: tMidiId) => {
  const octave = Math.trunc(midiId / 12);
  const noteName = noteNames[midiId % 12];

  return typeof midiId === "number" ? `${noteName}${octave}` : "n/a";
};

export const convertMidiIdToNoteName = (midiId: tMidiId) => {
  return typeof midiId === "number" ? noteNames2[midiId % 12][0] : "";
};

export const extractNotes = (noteArray: tNoteArray) => {
  const noteIndices: tNoteIndices = [];
  noteArray.forEach((value, i) => {
    if (value) noteIndices.push(i);
  });

  return noteIndices;
};

export const extractRoot = (noteIndices: tNoteIndices) => {
  return [noteIndices[0], noteIndices.slice(1, noteIndices.length)];
};

export const extractDistances = (noteIndices: tNoteIndices) =>
  noteIndices.length > 0
    ? Array(noteIndices.length - 1)
        .fill(null)
        .map((_, i) => noteIndices[i + 1] - noteIndices[i])
    : [];
