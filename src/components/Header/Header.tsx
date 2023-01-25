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
  midiState: boolean;
  settings: any;
}

const Header = ({ midiState, settings }: PropTypes) => {
  const settingsDisplay = Object.entries(settings).map((item: any) => ({
    key: item[1].displayName,
    value: item[1].value,
  }));

  return (
    <StyledHeader>
      <VerticalStack>
        <Text color={midiState ? "lightgreen" : "goldenrod"}>
          {midiState
            ? "external devices connected:"
            : "external device not found"}
        </Text>
        <Text>{false && "no devices"}</Text>
      </VerticalStack>
      <KeyValueTable data={settingsDisplay} />
    </StyledHeader>
  );
};

export default Header;