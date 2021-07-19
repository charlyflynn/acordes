import styled from "styled-components";

const TextStyled = styled.span`
  font-size: ${({ large }) => (large ? "52px" : "24px")};
  font-weight: bold;
  color: ${({ color }) => (color ? color : "ivory")};
  white-space: ${({ noWrap }) => noWrap};
  text-align: ${({ textAlign }) => textAlign};
`;

const Text = ({ children, ...props }) => {
  return <TextStyled {...props}>{children}</TextStyled>;
};

export default Text;
