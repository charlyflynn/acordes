import React from "react";
import styled from "styled-components";
import Text from "./Text";

const Container = styled.div`
  display: flex;
  width: 400px;
`;

const Name = styled.div`
  text-align: right;
  padding-right: 5px;
  border-right: 1px solid ivory;
  padding-right: 5px;
`;

const Value = styled.div`
  text-align: left;
  padding-left: 5px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 50%; */
`;

const Table = ({ children }) => {
  const names = [];
  const values = [];
  children.forEach(({ name, value }) => {
    names.push(
      <Name>
        <Text>{name}</Text>
      </Name>
    );
    values.push(
      <Value>
        <Text>{value}</Text>
      </Value>
    );
  });
  return (
    <Container>
      <Column>{names}</Column>
      <Column>{values}</Column>
    </Container>
  );
};

export default Table;
