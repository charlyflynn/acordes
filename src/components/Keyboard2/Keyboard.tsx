import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { noteUtils } from "utils";
import Key from "./Key";

const pianoRange = [21, 109];

const scaleFactor = 0.7;
const totalKeys = 127;
const whiteKeyWidth = 58 * scaleFactor;

const blackKeyPattern = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];
const keyOffset = [0, 1.45, 2, 3.45, 4, 6, 7.45, 8, 9.45, 10, 11.45, 12];

const Container = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 190px;
  position: fixed;
  bottom: 30px;

  overflow-x: scroll;
  ::-webkit-scrollbar {
    scrollbar-color: ivory;
    width: 13px;
    height: 13px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 1px black;
    border-radius: 10px;
    background-color: hsl(220, 13.043478260869565%, 30%);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: hsl(220, 13.043478260869565%, 60%);
  }
`;

const Keybed = styled.div<{ width: number }>`
  position: absolute;
  height: 170px;
  width: ${({ width }) => `${width}px`};
`;

interface iKeyboard {
  setTarget: React.Dispatch<React.SetStateAction<number | undefined>>;
  activeNotes: boolean[];
}

const Keyboard = ({ setTarget, activeNotes }: iKeyboard) => {
  const keyData = [...Array(totalKeys)].map((_, midiIndex) => ({
    midiIndex,
    blackKey: blackKeyPattern[midiIndex % 12],
    offset: Math.floor(midiIndex / 12) * 14 + keyOffset[midiIndex % 12],
    noteName: noteUtils.convertMidiIndexToNoteName(midiIndex),
  }));
  const truncatedKeyData = keyData.slice(pianoRange[0], pianoRange[1]);
  const keyElements = truncatedKeyData.map(({ midiIndex, noteName, blackKey, offset }) => {
    return (
      <Key
        key={noteName}
        noteName={noteName}
        activeNotes={activeNotes}
        midiIndex={midiIndex}
        type={blackKey}
        offset={offset - truncatedKeyData[0].offset}
        whiteKeyWidth={whiteKeyWidth}
        setTarget={setTarget}
      />
    );
  });
  return (
    <Container>
      <Keybed
        width={whiteKeyWidth * truncatedKeyData.filter(({ blackKey }) => blackKey === 0).length + 1}
      >
        {keyElements}
      </Keybed>
    </Container>
  );
};

export default Keyboard;
