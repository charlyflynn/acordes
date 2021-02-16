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

const Key = styled.div`
  position: absolute;
  box-sizing: border-box;
  margin-bottom: 50px;
  background-color: ${({ type, active }) =>
    active ? "goldenrod" : type ? "black" : "ivory"};
  z-index: ${({ type }) => type + 1};
  width: ${({ type }) => (type ? blackKeyWidth : whiteKeyWidth)}px;
  height: ${({ type }) => (type ? blackKeyHeight : whiteKeyHeight)}px;
  bottom: ${({ type }) => (type ? whiteKeyHeight - blackKeyHeight : 0)}px;
  left: ${({ offset }) => `${offset * slotWidth}px`};
  border-radius: 0 0 ${whiteKeyWidth / 13}px ${whiteKeyWidth / 13}px;
  border-top: ${thickBorder};
  border-bottom: ${thickBorder};
  border-left: ${({ type }) => (type ? thinBorder : thickBorder)};
  border-right: ${({ type }) => (type ? thinBorder : thickBorder)};
  border-bottom: ${({ type }) => (type ? thinBorder : null)};
  :hover {
    background-color: ${({ active }) => (active ? "lightgrey" : "lightgrey")};
  }
`;

const Keybed = styled.div`
  position: relative;
  width: ${totalKeySlots * slotWidth}px;
`;

const KeyboardOctave = ({ setTarget, activeNotes, octave }) => {
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
        onMouseOut={() => setTarget("n/a")}
      />
    );
  });
  return <Keybed>{keyArray}</Keybed>;
};

export default KeyboardOctave;
