import React from "react";
import styled from "styled-components";

const TextStyled = styled.span`
  font-size: ${({ large }) => (large ? "52px" : "24px")};
  font-weight: bold;
  color: ${({ color }) => (color ? color : "ivory")};
  white-space: nowrap;
`;

const Text = ({ children, large = false, color }) => {
  return (
    <TextStyled large={large} color={color}>
      {children}
    </TextStyled>
  );
};

export default Text;
