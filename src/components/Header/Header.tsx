import { Text, VerticalStack } from "components";
import styled from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: space-between;
  width: 100vw;
  height: auto;
  border-bottom: 1px solid ivory;
  padding: 24px 0;
`;

interface PropTypes {
  midiSuccess?: boolean;
}

const Header = ({ midiSuccess }: PropTypes) => {
  return (
    <StyledHeader>
      <VerticalStack>
        <Text color={midiSuccess ? "lightgreen" : "goldenrod"}>
          {midiSuccess ? "MIDI device connected" : "MIDI device not found"}
        </Text>
        <Text>{false && "no devices"}</Text>
      </VerticalStack>
    </StyledHeader>
  );
};

export default Header;
