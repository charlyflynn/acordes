import styled from "styled-components";

interface PropTypes {
  large?: boolean;
  textAlign?: string;
  color?: string;
}

const TextStyled = styled.span<PropTypes>`
  font-size: ${({ large }) => (large ? "52px" : "24px")};
  font-weight: bold;
  color: ${({ color }) => (color ? color : "ivory")};
  text-align: ${({ textAlign }) => textAlign};
`;

const Text = ({
  children,
  ...props
}: { children: React.ReactNode } & PropTypes) => {
  return <TextStyled {...props}>{children}</TextStyled>;
};

export default Text;
