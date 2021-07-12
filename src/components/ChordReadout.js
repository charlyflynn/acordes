import React from "react";
import styled from "styled-components";
import Text from "./Text";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 250px;
  width: 450px;
  border-radius: 45px;
  border: 1px solid ivory;
`;

const ChordReadout = ({ chords }) => {
  const bestFit = chords.length ? chords[0] : "-";
  const alternatives = chords.length > 1 ? chords.slice(1) : "-";
  return (
    <Container>
      <Text large color="goldenrod">
        {bestFit}
      </Text>
      <Text color="ivory">{alternatives}</Text>
    </Container>
  );
};

export default ChordReadout;
