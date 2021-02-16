import React from "react";
import styled from "styled-components";
import Keyboard from "./Keyboard";
import Text from "./Text";
import VerticalStack from "./VerticalStack";

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

const activeNotesDefault = {};

[...Array(127).keys()].reduce((item) =>
  Object.assign(activeNotesDefault, { [item]: false })
);

const View = () => {
  const [activeNotes, setactiveNotes] = React.useState(activeNotesDefault);
  const [startingOctave, setstartingOctave] = React.useState(3);
  const [totalOctaves, settotalOctaves] = React.useState(3);
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
      <Header>
        <VerticalStack>
          <Text small colour={midiState ? "lightgreen" : "goldenrod"}>
            {midiState
              ? "external device connected"
              : "external device not found"}
          </Text>
        </VerticalStack>
        <VerticalStack>
          <Text small>Starting Octave: {startingOctave}</Text>
          <Text small>Total Octaves: {totalOctaves}</Text>
        </VerticalStack>
      </Header>
      <Text large>{target}</Text>
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
