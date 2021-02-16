import React from "react";
import styled from "styled-components";
import Keyboard from "./Keyboard";
import Text from "./Text";
import VerticalStack from "./VerticalStack";
import KeyValueTable from "./KeyValueTable";
import * as fn from "../functions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100vh;
  width: 100vw;
  z-index: -1;
  align-items: center;
  justify-content: space-between;
  background-color: #282c34;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: space-between;
  width: 100%;
  height: auto;
  border-bottom: 1px solid ivory;
  padding: 24px;
`;

// const activeNotesDefault = {};

// [...Array(127).keys()].reduce((item) =>
//   Object.assign(activeNotesDefault, { [item]: false })
// );

const activeNotesDefault = [...Array(127).fill(false)];

const View = () => {
  const [activeNotes, setactiveNotes] = React.useState(activeNotesDefault);
  const [startingOctave] = React.useState(3);
  const [totalOctaves] = React.useState(3);
  const onMIDISuccess = (access) => {
    if (access.inputs.size > 0) setmidiState(true);
    else setmidiState(false);

    for (var input of access.inputs.values())
      input.onmidimessage = (midiMessage) => {
        getMIDIMessage(midiMessage);
      };
  };

  const onMIDIFailure = () => {
    window.alert("Midi access failure");
    console.log("Midi access failure");
  };

  const getMIDIMessage = (midiMessage, currentNotes) => {
    const [midiCmd, noteID, velocity] = midiMessage.data;
    if (midiCmd === 144 && velocity > 0) {
      setactiveNotes([
        ...activeNotes.slice(0, noteID),
        true,
        ...activeNotes.slice(noteID, activeNotes.length),
      ]);
      // activeNotes.current[noteID] = true;
    } else if (midiCmd === 128 || velocity === 0) {
      setactiveNotes([
        ...activeNotes.slice(0, noteID),
        false,
        ...activeNotes.slice(noteID, activeNotes.length),
      ]);
      // activeNotes.current[noteID] = false;
    }
  };

  React.useEffect(() => {
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [target, setTarget] = React.useState("n/a");

  const [midiState, setmidiState] = React.useState(false);

  const activeNotesReal = fn.extractNotes(activeNotes);

  return (
    <Container>
      <Header>
        <VerticalStack>
          <Text small colour={midiState ? "lightgreen" : "goldenrod"}>
            {midiState
              ? "external devices connected:"
              : "external device not found"}
          </Text>
          <Text>{false && "no devices"}</Text>
        </VerticalStack>
        <VerticalStack>
          <Text small>Starting Octave: {startingOctave}</Text>
          <Text small>Total Octaves: {totalOctaves}</Text>
        </VerticalStack>
      </Header>
      <VerticalStack>
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
      </VerticalStack>
      <Keyboard
        setTarget={setTarget}
        activeNotes={activeNotes}
        startingOctave={startingOctave}
        totalOctaves={totalOctaves}
      />
    </Container>
  );
};

export default View;
