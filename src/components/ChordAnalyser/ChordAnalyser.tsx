import { useRef, useEffect, useState } from "react";
import { ChordReadout, Keyboard, Keyboard2, MidiNoteInfo, VerticalStack } from "components";
import styled from "styled-components";
import { noteUtils } from "utils";

const Container = styled.div`
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

const View = () => {
  const [startingOctave] = useState(1);
  const [totalOctaves] = useState(8);

  const midi = useRef<WebMidi.MIDIAccess>();
  const [midiSuccess, setMidiSuccess] = useState<boolean>();
  const noteRef = useRef([...Array(127).fill(false)]);
  const [tick, setTick] = useState(false);
  const activeNotes = noteRef.current;
  useEffect(() => {
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  }, []);

  const onMIDISuccess = (access: WebMidi.MIDIAccess) => {
    midi.current = access;
    if (access.inputs.size > 0) setMidiSuccess(true);
    if (access.inputs.size === 0) setMidiSuccess(false);
  };

  const onMIDIFailure = () => {
    setMidiSuccess(false);
    window.alert("Midi access failure");
    console.log("Midi access failure");
  };

  useEffect(() => {
    if (midiSuccess && midi.current) {
      midi.current.inputs.forEach((input) => {
        input.onmidimessage = (message) => {
          const [midiCmd, noteID, velocity] = message.data;
          if (midiCmd === 144 && velocity > 0) {
            activeNotes[noteID] = true;
            setTick(!tick);
          } else if (midiCmd === 128 || velocity === 0) {
            activeNotes[noteID] = false;
            setTick(!tick);
          }
        };
      });
    }
  });

  const [target, setTarget] = useState<number>();

  const activeNotesReal = noteUtils.extractNotes(activeNotes);

  return (
    <ContentContainer>
      <VerticalStack>
        <InfoContainer>
          <ChordReadout chords={noteUtils.detectChord(activeNotesReal)} />
          <MidiNoteInfo
            activeNotes={activeNotes}
            activeNotesReal={activeNotesReal}
            target={target}
          />
        </InfoContainer>
        <Keyboard2 setTarget={setTarget} activeNotes={activeNotes} />
      </VerticalStack>
      {false && (
        <Keyboard
          setTarget={setTarget}
          activeNotes={activeNotes}
          startingOctave={startingOctave}
          totalOctaves={totalOctaves}
        />
      )}
    </ContentContainer>
  );
};

export default View;
