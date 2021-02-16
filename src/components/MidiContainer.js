import React from "react";
import styled from "styled-components";
import Keyboard from "./Keyboard";
import Readout from "./Readout";

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

const activeNotesDefault = {};

[...Array(127).keys()].reduce((item) =>
  Object.assign(activeNotesDefault, { [item]: false })
);

const View = () => {
  const [activeNotes, setactiveNotes] = React.useState(activeNotesDefault);
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
      setactiveNotes({ ...activeNotes, [noteID]: true });
      // activeNotes.current[noteID] = true;
    } else if (midiCmd === 128 || velocity === 0) {
      setactiveNotes({ ...activeNotes, [noteID]: false }, () =>
        console.log(activeNotes[noteID])
      );
      // activeNotes.current[noteID] = false;
    }
    console.log(midiMessage.data);
    console.log(activeNotes[noteID]);
  };

  React.useEffect(() => {
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [target, setTarget] = React.useState("n/a");

  const [midiState, setmidiState] = React.useState(false);

  return (
    <Container>
      <Readout>
        {midiState ? "external device connected" : "external device not found"}
      </Readout>
      <Readout large>{target}</Readout>
      <Keyboard setTarget={setTarget} activeNotes={activeNotes} octaves={4} />
    </Container>
  );
};

export default View;
