import { tMidiId, tNoteIndices, tNoteArray } from "./types";

const noteNames = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];

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

export const convertMidiIdToNote = (midiId: tMidiId) => {
  const octave = Math.trunc(midiId / 12) - 1;
  const noteName = noteNames[midiId % 12];

  return typeof midiId === "number" ? `${noteName}${octave}` : "n/a";
};

export const convertMidiIdToNoteName = (midiId: tMidiId) => {
  1;
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
  return { root: noteIndices[0], else: noteIndices.slice(1, noteIndices.length) };
};

export const extractDistances = (noteIndices: tNoteIndices) =>
  noteIndices.length > 0
    ? Array(noteIndices.length - 1)
        .fill(null)
        .map((_, i) => noteIndices[i + 1] - noteIndices[i])
    : [];
