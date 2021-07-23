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

const Keyboard = ({ setTarget, activeNotes, octaveStart, octaveSpan }) => {
  return (
    <KeyboardStyled>
      {[...Array(octaveSpan).keys()].map((_, i) => (
        <KeyboardOctave
          key={`octave${i + octaveStart}`}
          setTarget={setTarget}
          activeNotes={activeNotes}
          octave={i + octaveStart}
        />
      ))}
    </KeyboardStyled>
  );
};

export default Keyboard;
