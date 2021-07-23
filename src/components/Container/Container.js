import { detect } from "@tonaljs/chord-detect";
import {
  ChordReadout,
  DesktopOnly,
  Header,
  Keyboard,
  MidiNoteInfo,
  VerticalStack,
} from "components";
import { MidiContext } from "contexts";
import { useContext, useEffect, useState } from "react";
import { isDesktop } from "react-device-detect";
import styled from "styled-components";
import { noteUtils } from "utils";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100vh;
  width: 100vw;
  z-index: -1;
  align-items: center;
  background-color: #282c34;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: horizontal;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  justify-content: flex-end;
  margin-bottom: 50px;
`;

const activeNotesDefault = [...Array(127).fill(false)];

const Container = () => {
  const { settings } = useContext(MidiContext);
  const [activeNotes, setactiveNotes] = useState(activeNotesDefault);
  const [startingOctave] = useState(3);
  const [totalOctaves] = useState(3);
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

  useEffect(() => {
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [target, setTarget] = useState("n/a");

  const [midiState, setmidiState] = useState(false);

  const activeNotesReal = noteUtils.extractNotes(activeNotes);

  return (
    <Wrapper>
      {isDesktop ? (
        <>
          <Header midiState={midiState} settings={settings} />
          <ContentContainer>
            <VerticalStack>
              <InfoContainer>
                <ChordReadout
                  chords={
                    activeNotesReal.length > 2
                      ? detect(
                          activeNotesReal.map((item) => {
                            return noteUtils.convertMidiIdToNoteName(item);
                          })
                        )
                      : []
                  }
                />

                <MidiNoteInfo
                  activeNotes={activeNotes}
                  activeNotesReal={activeNotesReal}
                  target={target}
                />
              </InfoContainer>
            </VerticalStack>
            <Keyboard
              setTarget={setTarget}
              activeNotes={activeNotes}
              startingOctave={startingOctave}
              totalOctaves={totalOctaves}
            />
          </ContentContainer>
        </>
      ) : (
        <DesktopOnly />
      )}
    </Wrapper>
  );
};

export default Container;
