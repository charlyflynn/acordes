import { Text, VerticalStack } from "components";
import React from "react";
import styled from "styled-components";

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
  const alternatives =
    chords.length > 1
      ? chords.slice(1).map((item) => <Text color="ivory">{item}</Text>)
      : "-";
  return (
    <Container>
      <Text large color="goldenrod">
        {bestFit}
      </Text>
      <VerticalStack>{alternatives}</VerticalStack>
    </Container>
  );
};

export default ChordReadout;
