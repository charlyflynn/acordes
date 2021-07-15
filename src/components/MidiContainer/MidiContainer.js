import { detect } from "@tonaljs/chord-detect";
import {
  ChordReadout,
  Info,
  Keyboard,
  Settings,
  Text,
  VerticalStack,
} from "components";
import * as fn from "functions";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
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
  width: 100vw;
  height: auto;
  border-bottom: 1px solid ivory;
  padding: 24px 0;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: horizontal;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
`;

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
          <Text small color={midiState ? "lightgreen" : "goldenrod"}>
            {midiState
              ? "external devices connected:"
              : "external device not found"}
          </Text>
          <Text>{false && "no devices"}</Text>
        </VerticalStack>
        <Settings settings={{ startingOctave, totalOctaves }} />
      </Header>
      <ContentContainer>
        <VerticalStack>
          <InfoContainer>
            <ChordReadout
              chords={
                activeNotesReal.length > 2
                  ? detect(
                      activeNotesReal.map((item) => {
                        return fn.convertMidiIdToNoteName(item);
                      })
                    )
                  : []
              }
            />

            <Info
              activeNotes={activeNotes}
              activeNotesReal={activeNotesReal}
              target={target}
            />
          </InfoContainer>
        </VerticalStack>
      </ContentContainer>
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
