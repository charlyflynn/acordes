import React from "react";
import styled from "styled-components";

const Text = styled.p`
  font-size: ${({ large }) => (large ? "52px" : "24px")};
  font-weight: bold;
  color: ivory;
`;

const Readout = ({ children, large = false }) => {
  return <Text large={large}>{children}</Text>;
};

export default Readout;
