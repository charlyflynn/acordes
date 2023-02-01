import { detect } from "@tonaljs/chord-detect";
import { KeyValueTable } from "components";
import { noteUtils } from "utils";

interface PropTypes {
  activeNotes: boolean[];
  activeNotesReal: number[];
  target?: number;
}

const MidiNoteInfo = ({ activeNotes, activeNotesReal, target }: PropTypes) => {
  const infoData = [
    { key: "Target Midi Id", value: target },
    { key: "Target Note", value: target ? noteUtils.convertMidiIdToNote(target) : "n/a" },
    {
      key: "Selected Notes (Midi)",
      value: activeNotesReal.length > 0 ? activeNotesReal.toString() : "n/a",
    },
    {
      key: "Selected Notes",
      value:
        activeNotesReal.length > 0
          ? activeNotesReal.map((item) => noteUtils.convertMidiIdToNote(item)).toString()
          : "n/a",
    },
    {
      key: "Chord possibilities",
      value:
        activeNotesReal.length > 2
          ? detect(
              activeNotesReal.map((item) => {
                return noteUtils.convertMidiIdToNoteName(item);
              })
            ).toString()
          : "n/a",
    },
    {
      key: "Intervallic Distances",
      value:
        activeNotesReal.length > 1
          ? noteUtils.extractDistances(noteUtils.extractNotes(activeNotes)).toString()
          : "n/a",
    },
    {
      key: "Root Note",
      value:
        activeNotesReal.length > 0
          ? noteUtils.convertMidiIdToNote(noteUtils.extractRoot(activeNotesReal).root)
          : "n/a",
    },
  ];

  return false && <KeyValueTable data={infoData} />;
};

export default MidiNoteInfo;
