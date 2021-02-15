import React from 'react';
import styled from 'styled-components';

const Text = styled.p`
  font-size: 52px;
  font-weight: bold;
  color: white;
`;

const Readout = ({ children }) => {
  return <Text>{children}</Text>
}

export default Readout