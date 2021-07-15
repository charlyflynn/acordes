import { detect } from "@tonaljs/chord-detect";
import { KeyValueTable } from "components";
import React from "react";
import { noteUtils } from "utils";

const Info = ({ activeNotes, activeNotesReal, target }) => {
  return (
    false && (
      <KeyValueTable styles={{ justifyContent: "center" }}>
        {[
          { name: "Target Midi Id", value: target },
          { name: "Target Note", value: noteUtils.convertMidiIdToNote(target) },
          {
            name: "Selected Notes (Midi)",
            value:
              activeNotesReal.length > 0 ? activeNotesReal.toString() : "n/a",
          },
          {
            name: "Selected Notes",
            value:
              activeNotesReal.length > 0
                ? activeNotesReal
                    .map((item) => noteUtils.convertMidiIdToNote(item))
                    .toString()
                : "n/a",
          },
          {
            name: "Chord possibilities",
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
            name: "Intervallic Distances",
            value:
              activeNotesReal.length > 1
                ? noteUtils
                    .extractDistances(noteUtils.extractNotes(activeNotes))
                    .toString()
                : "n/a",
          },
          {
            name: "Root Note",
            value:
              activeNotesReal.length > 0
                ? noteUtils.convertMidiIdToNote(
                    noteUtils.extractRoot(activeNotesReal)[0]
                  )
                : "n/a",
          },
        ]}
      </KeyValueTable>
    )
  );
};

export default Info;
