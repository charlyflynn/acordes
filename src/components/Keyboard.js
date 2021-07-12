import React from "react";
import styled from "styled-components";
import KeyboardOctave from "./KeyboardOctave";

const KeyboardStyled = styled.div`
  position: relative;
  display: flex;
  flex-wrap: flex;
  flex-direction: row;
`;

const Keyboard = ({ setTarget, activeNotes, startingOctave, totalOctaves }) => {
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
