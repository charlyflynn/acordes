import { Text, VerticalStack } from "components";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 325px;
  width: 325px;
  border-radius: 325px;
  border: 2px solid ivory;
`;

interface PropTypes {
  chords: string[];
}

const ChordReadout = ({ chords }: PropTypes) => {
  const bestFit = chords.length ? chords[0] : "-";
  const alternatives =
    chords.length > 1 ? chords.slice(1).map((item) => <Text color="ivory">{item}</Text>) : "-";
  return (
    <Container>
      <Text large={true} color="goldenrod">
        {bestFit}
      </Text>
      {false && <VerticalStack>{alternatives}</VerticalStack>}
    </Container>
  );
};

export default ChordReadout;
