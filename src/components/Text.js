import React from "react";
import styled from "styled-components";

const TextStyled = styled.span`
  font-size: ${({ large }) => (large ? "52px" : "24px")};
  font-weight: bold;
  color: ${({ colour }) => (colour ? colour : "ivory")};
`;

const Text = ({ children, large = false, colour }) => {
  return (
    <TextStyled large={large} colour={colour}>
      {children}
    </TextStyled>
  );
};

export default Text;
