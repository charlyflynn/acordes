import React from "react";
import styled from "styled-components";
import Keyboard from "./Keyboard";
import Readout from "./Readout";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100vh;
  z-index: -1;
  align-items: center;
  justify-content: center;
  background-color: #282c34;
`;

// [...Array(127).keys()].forEach(() => {false});
const activeNotesDefault = {};
for (let i = 0; i < 127; i++) {
  activeNotesDefault[i] = false;
}

const View = () => {
  const [activeNotes, setactiveNotes] = React.useState(activeNotesDefault);
  // const activeNotes = React.useRef(activeNotesDefault);
  const onMIDISuccess = (access) => {
    if (access.inputs.size > 0) setmidiState(true);
    else setmidiState(false);

    for (var input of access.inputs.values())
      input.onmidimessage = (midiMessage) => {
        getMIDIMessage(midiMessage);
        console.log(midiMessage, activeNotes);
      };
  };

  const onMIDIFailure = () => {
    window.alert("Midi access failure");
    console.log("Midi access failure");
  };

  const getMIDIMessage = (midiMessage, currentNotes) => {
    // console.log(midiMessage);
    const [midiID, noteID, velocity] = midiMessage.data;
    if (midiID === 144 && velocity > 0) {
      console.log("note on");
      setactiveNotes({ ...activeNotes, [noteID]: true });
      // activeNotes.current[noteID] = true;
    } else if (midiID === 128) {
      console.log("note off");
      setactiveNotes({ ...activeNotes, [noteID]: false });
      // activeNotes.current[noteID] = false;
    }
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
      <Readout>{target}</Readout>
      <Keyboard setTarget={setTarget} activeNotes={activeNotes} />
    </Container>
  );
};

export default View;
