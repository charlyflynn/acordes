import React from "react";
import * as fn from "../functions";
import KeyValueTable from './KeyValueTable';

const Info = (({ activeNotesReal }) => {
  return (
    <KeyValueTable>
      {[
        { name: "Target Midi Id", value: target },
        { name: "Target Note", value: fn.convertMidiIdToNote(target) },
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
                  .map((item) => fn.convertMidiIdToNote(item))
                  .toString()
              : "n/a",
        },
        {
          name: "Chord possibilities",
          value:
            activeNotesReal.length > 2
              ? detect(
                  activeNotesReal.map((item) => {
                    return fn.convertMidiIdToNoteName(item);
                  })
                ).toString()
              : "n/a",
        },
        {
          name: "Intervallic Distances",
          value:
            activeNotesReal.length > 1
              ? fn.extractDistances(fn.extractNotes(activeNotes)).toString()
              : "n/a",
        },
        {
          name: "Root Note",
          value:
            activeNotesReal.length > 0
              ? fn.convertMidiIdToNote(fn.extractRoot(activeNotesReal)[0])
              : "n/a",
        },
      ]}
    </KeyValueTable>
  )
};

export default Info;
