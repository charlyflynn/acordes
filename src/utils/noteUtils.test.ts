import * as noteUtils from "./noteUtils";

const activeNotes = [...Array(127).fill(false)];

activeNotes[40] = true;
activeNotes[45] = true;
activeNotes[49] = true;

test("extract active notes to an array of midi note IDs", () => {
  expect(noteUtils.extractNotes(activeNotes)).toStrictEqual([40, 45, 49]);
});

test("extract root notes by selecting lowest from MIDI note indice array", () => {
  expect(noteUtils.extractRoot(noteUtils.extractNotes(activeNotes))).toStrictEqual({
    root: 40,
    else: [45, 49],
  });
});

test("extract intervallic distances in semitones from MIDI note indice array", () => {
  expect(noteUtils.extractDistances(noteUtils.extractNotes(activeNotes))).toStrictEqual([5, 4]);
});

test("correctly identifies conventional octave", () => {
  expect(noteUtils.determineOctavefromMidiIndex(11)).toBe(-1);
  expect(noteUtils.determineOctavefromMidiIndex(12)).toBe(0);
  expect(noteUtils.determineOctavefromMidiIndex(22)).toBe(0);
  expect(noteUtils.determineOctavefromMidiIndex(24)).toBe(1);
});
