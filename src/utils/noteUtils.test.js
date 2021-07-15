import * as noteUtils from "./noteUtils";

const activeNotes = [...Array(127).fill(false)];

activeNotes[40] = true;
activeNotes[45] = true;
activeNotes[49] = true;

test("extract active notes to an array of midi note IDs", () => {
  expect(noteUtils.extractNotes(activeNotes)).toStrictEqual([40, 45, 49]);
});

test("extract root notes by selecting lowest from MIDI note indice array", () => {
  expect(
    noteUtils.extractRoot(noteUtils.extractNotes(activeNotes))
  ).toStrictEqual([40, [45, 49]]);
});

test("extract intervallic distances in semitones from MIDI note indice array", () => {
  expect(
    noteUtils.extractDistances(noteUtils.extractNotes(activeNotes))
  ).toStrictEqual([5, 4]);
});
