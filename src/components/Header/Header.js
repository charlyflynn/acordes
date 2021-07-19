import { KeyValueTable, Text, VerticalStack } from "components";
import styled from "styled-components";

const StyledHeader = styled.head`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: space-between;
  width: 100vw;
  height: auto;
  border-bottom: 1px solid ivory;
  padding: 24px 0;
`;

const Header = ({ midiState, settings }) => {
  const settingsDisplay = Object.entries(settings).map((item) => ({
    key: item[1].displayName,
    value: item[1].value,
  }));

  return (
    <StyledHeader>
      <VerticalStack>
        <Text small color={midiState ? "lightgreen" : "goldenrod"}>
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
