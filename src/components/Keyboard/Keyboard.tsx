import React from "react";
import styled from "styled-components";
import KeyboardOctave from "./KeyboardOctave";

const KeyboardStyled = styled.div`
  position: relative;
  display: flex;
  flex-wrap: flex;
  flex-direction: row;
  margin-bottom: 50px;
`;

interface PropTypes {
  setTarget: React.Dispatch<React.SetStateAction<number | string>>;
  activeNotes: boolean[];
  startingOctave: number;
  totalOctaves: number;
}
const Keyboard = ({
  setTarget,
  activeNotes,
  startingOctave,
  totalOctaves,
}: PropTypes) => {
  return (
    <KeyboardStyled>
      {[...Array(totalOctaves).keys()].map((_, i) => (
        <KeyboardOctave
          key={`octave${i + startingOctave}`}
          setTarget={setTarget}
          activeNotes={activeNotes}
          octave={i + startingOctave}
        />
      ))}
    </KeyboardStyled>
  );
};

export default Keyboard;
