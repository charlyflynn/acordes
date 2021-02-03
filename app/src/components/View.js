import React from 'react';
import styled from 'styled-components';
import Keyboard from './Keyboard';
import Readout from './Readout';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100vh;
  z-index: -1;
  align-items: center;
  justify-content: center;
  background-color: #282c34;;
`;

const View = () => {
  const [target, setTarget] = React.useState('n/a')
  return (
    <Container>
      <Readout>{target}</Readout>
      <Keyboard setTarget={setTarget} />
    </Container>
  )
}

export default View