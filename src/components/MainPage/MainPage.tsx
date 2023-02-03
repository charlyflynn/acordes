import styled from "styled-components";
import { isDesktop } from "react-device-detect";
import { ChordAnalyser, DesktopOnly, Header } from "components";

function MainPage() {
  return (
    <Container>
      {isDesktop ? (
        <>
          <Header />
          <ChordAnalyser />
        </>
      ) : (
        <DesktopOnly />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100vh;
  width: 100vw;
  z-index: -1;
  align-items: center;
  background-color: #282c34;
`;

export default MainPage;
