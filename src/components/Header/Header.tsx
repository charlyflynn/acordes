import { KeyValueTable, Text, VerticalStack } from "components";
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
  settings: any;
}

const Header = ({ midiSuccess, settings }: PropTypes) => {
  const settingsDisplay = Object.entries(settings).map((item: any) => ({
    key: item[1].displayName,
    value: item[1].value,
  }));

  return (
    <StyledHeader>
      <VerticalStack>
        <Text color={midiSuccess ? "lightgreen" : "goldenrod"}>
          {midiSuccess ? "MIDI device connected" : "MIDI device not found"}
        </Text>
        <Text>{false && "no devices"}</Text>
      </VerticalStack>
      <KeyValueTable data={settingsDisplay} />
    </StyledHeader>
  );
};

export default Header;
