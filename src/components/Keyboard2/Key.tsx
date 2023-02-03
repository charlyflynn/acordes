import React from "react";
import styled from "styled-components";

const locators = ["C0", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"];

const thinBorder = "2px solid #282c34";
const thickBorder = "1px solid #282c34";

interface iStyledKey {
  type: number;
  active: boolean;
  offset: number;
  midiIndex: number;
  dimensions: {
    slotWidth: number;
    whiteKeyWidth: number;
    blackKeyWidth: number;
    whiteKeyHeight: number;
    blackKeyHeight: number;
  };
}

const StyledKey = styled.div<iStyledKey>`
  // page position
  position: absolute;
  box-sizing: border-box;

  //key color
  background-color: ${({ type, active }) => (active ? "goldenrod" : type ? "black" : "ivory")};
  :hover {
    background-color: ${({ active }) => (active ? "grey" : "hsl(43, 74%, 80%)")};
  }

  // black/white key construction
  left: ${({ offset, dimensions }) => `${offset * dimensions.slotWidth}px`};
  width: ${({ type, dimensions }) =>
    type ? dimensions.blackKeyWidth : dimensions.whiteKeyWidth}px;
  height: ${({ type, dimensions }) =>
    type ? dimensions.blackKeyHeight : dimensions.whiteKeyHeight}px;
  z-index: ${({ type }) => type + 1};

  // key borders
  border-radius: ${({ dimensions }) =>
    `0 0 ${dimensions.whiteKeyWidth / 13}px ${dimensions.whiteKeyWidth / 13}px`};
  border-top: ${thickBorder};
  border-left: ${({ type }) => (type ? thinBorder : thickBorder)};
  border-right: ${({ type }) => (type ? thinBorder : thickBorder)};
  border-bottom: ${({ type }) => (type ? thinBorder : null)};
`;

interface iKey {
  setTarget: React.Dispatch<React.SetStateAction<number | undefined>>;
  activeNotes: boolean[];
  midiIndex: number;
  offset: number;
  type: number;
  noteName: string;
  whiteKeyWidth: number;
}

function Key({ setTarget, activeNotes, midiIndex, offset, type, noteName, whiteKeyWidth }: iKey) {
  const dimensions = {
    whiteKeyWidth,
    blackKeyWidth: whiteKeyWidth * 0.6,
    whiteKeyHeight: whiteKeyWidth * 3.4,
    slotWidth: whiteKeyWidth / 2,
    blackKeyHeight: whiteKeyWidth * 3.4 * 0.6,
  };
  return (
    <StyledKey
      midiIndex={midiIndex}
      type={type}
      offset={offset}
      dimensions={dimensions}
      active={activeNotes[midiIndex]}
      onClick={() => {
        activeNotes[midiIndex] = !activeNotes[midiIndex];
      }}
      onMouseOver={() => setTarget(midiIndex)}
      onMouseOut={() => setTarget(undefined)}
    >
      {locators.includes(noteName) && noteName}
    </StyledKey>
  );
}

export default Key;
