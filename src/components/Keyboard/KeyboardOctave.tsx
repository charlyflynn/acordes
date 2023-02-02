import React from "react";
import styled from "styled-components";

const scaleFactor = 0.7;
const totalKeySlots = 14;
const whiteKeyWidth = 58 * scaleFactor;
const blackKeyWidth = whiteKeyWidth * 0.6;
const slotWidth = whiteKeyWidth / 2;
const whiteKeyHeight = whiteKeyWidth * 3.4;
const blackKeyHeight = whiteKeyHeight * 0.6;

const keyPattern = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];
const keyOffset = [0, 1.45, 2, 3.45, 4, 6, 7.45, 8, 9.45, 10, 11.45, 12];

const thinBorder = "2px solid #282c34";
const thickBorder = "1px solid #282c34";

interface KeyPropTypes {
  type: number;
  active: boolean;
  offset: number;
}

const Key = styled.div<KeyPropTypes>`
  // page position
  position: absolute;
  box-sizing: border-box;

  //key color
  background-color: ${({ type, active }) => (active ? "goldenrod" : type ? "black" : "ivory")};
  :hover {
    background-color: ${({ active }) => (active ? "grey" : "hsl(43, 74%, 80%)")};
  }

  // black/white key construction
  left: ${({ offset }) => `${offset * slotWidth}px`};
  width: ${({ type }) => (type ? blackKeyWidth : whiteKeyWidth)}px;
  height: ${({ type }) => (type ? blackKeyHeight : whiteKeyHeight)}px;
  bottom: ${({ type }) => (type ? whiteKeyHeight - blackKeyHeight : 0)}px;
  z-index: ${({ type }) => type + 1};

  // key borders
  border-radius: 0 0 ${whiteKeyWidth / 13}px ${whiteKeyWidth / 13}px;
  border-top: ${thickBorder};
  border-left: ${({ type }) => (type ? thinBorder : thickBorder)};
  border-right: ${({ type }) => (type ? thinBorder : thickBorder)};
  border-bottom: ${({ type }) => (type ? thinBorder : null)};
`;

const Keybed = styled.div`
  position: relative;
  width: ${totalKeySlots * slotWidth}px;
`;

interface KeyboardOctavePropTypes {
  setTarget: React.Dispatch<React.SetStateAction<number | undefined>>;
  activeNotes: boolean[];
  octave: number;
}

const KeyboardOctave = ({ setTarget, activeNotes, octave }: KeyboardOctavePropTypes) => {
  const keyArray = [...Array(12).keys()].map((octaveIndex) => {
    const absIndex = octave * 12 + octaveIndex;
    const type = keyPattern[octaveIndex];
    const offset = keyOffset[octaveIndex];
    return (
      <Key
        key={absIndex}
        type={type}
        offset={offset}
        active={activeNotes[absIndex]}
        onClick={() => {
          activeNotes[absIndex] = !activeNotes[absIndex];
        }}
        onMouseOver={() => setTarget(absIndex)}
        onMouseOut={() => setTarget(undefined)}
      >
        {absIndex === 12 ? "C0" : null}
        {absIndex === 36 ? "C2" : null}
        {absIndex === 60 ? "C4" : null}
        {absIndex === 84 ? "C6" : null}
        {absIndex === 108 ? "C8" : null}
      </Key>
    );
  });
  return <Keybed>{keyArray}</Keybed>;
};

export default KeyboardOctave;
