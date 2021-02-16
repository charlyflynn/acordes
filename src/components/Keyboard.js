import React from "react";
import styled from "styled-components";

const scaleFactor = 0.7;

const octaves = 4;
const totalKeySlots = octaves * 14;
const whiteKeyWidth = 58 * scaleFactor;
const blackKeyWidth = whiteKeyWidth * 0.6;
const slotWidth = whiteKeyWidth / 2;
const keyboardWidth = totalKeySlots * slotWidth;
const whiteKeyHeight = whiteKeyWidth * 3.4;
const blackKeyHeight = whiteKeyHeight * 0.6;
const keyPattern = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];
const keyOffset = [0, 1.45, 2, 3.45, 4, 6, 7.45, 8, 9.45, 10, 11.45, 12];

const blackKeyBorder = "2px solid #282c34";
const whiteKeyBorder = "1px solid #282c34";

const Key = styled.div`
  position: absolute;
  box-sizing: border-box;
  background-color: ${({ type, active }) =>
    active ? "powderblue" : type ? "black" : "ivory"};
  z-index: ${({ type }) => type + 1};
  width: ${({ type }) => (type ? blackKeyWidth : whiteKeyWidth)}px;
  height: ${({ type }) => (type ? blackKeyHeight : whiteKeyHeight)}px;
  bottom: ${({ type }) => (type ? whiteKeyHeight - blackKeyHeight : 0)}px;
  left: ${({ offset }) => `${offset * slotWidth}px`};
  border-radius: 0 0 ${whiteKeyWidth / 13}px ${whiteKeyWidth / 13}px;
  border-left: ${({ type }) => (type ? blackKeyBorder : whiteKeyBorder)};
  border-right: ${({ type }) => (type ? blackKeyBorder : whiteKeyBorder)};
  border-bottom: ${({ type }) => (type ? blackKeyBorder : null)};
  margin-bottom: 50px;
  :hover {
    background-color: ${({ active }) => (active ? "lightcoral" : "lightgreen")};
  }
`;

const Keybed = styled.div`
  position: relative;
  width: ${keyboardWidth}px;
`;

const Keyboard = ({ setTarget, activeNotes, octaveRange = [0, undefined] }) => {
  const keyArray = [...Array(octaves).keys()]
    .map((octave) => {
      const keys = [...Array(12).keys()]
        .map((noteIndex) => {
          const absIndex = octave * 12 + noteIndex;
          const type = keyPattern[noteIndex];
          const offset = octave * 14 + keyOffset[noteIndex];
          return {
            absIndex,
            noteIndex,
            octave,
            type,
            offset,
            active: false,
            hover: false,
          };
        })
        .slice(octaveRange[0] * 12, octaveRange[1]);
      return keys;
    })
    .flat();
  return (
    <>
      <Keybed>
        {keyArray.map(({ type, offset, absIndex }) => (
          <Key
            key={absIndex}
            i={absIndex}
            type={type}
            offset={offset}
            active={activeNotes[absIndex]}
            onClick={() => {
              activeNotes[absIndex] = !activeNotes[absIndex];
            }}
            onMouseOver={() => setTarget(absIndex)}
            onMouseOut={() => setTarget("n/a")}
          />
        ))}
      </Keybed>
    </>
  );
};

export default Keyboard;
