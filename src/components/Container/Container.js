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
import { useContext, useState } from "react";
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

const Container = () => {
  const { settings, activeNotes, activeNotesReal, devices } = useContext(
    MidiContext
  );
  const [target, setTarget] = useState("n/a");
  return (
    <Wrapper>
      {isDesktop ? (
        <>
          <Header devices={devices} settings={settings} />
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
              settings={settings}
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
