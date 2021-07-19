import { Text } from "components";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 400px;
`;

const Key = styled.div`
  text-align: right;
  padding-right: 5px;
  border-right: 1px solid ivory;
  padding-right: 10px;
`;

const Value = styled.div`
  text-align: left;
  padding-left: 10px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Table = ({ data }) => {
  const keys = data.map(({ key }) => (
    <Key key={`${key}-key`}>
      <Text>{key}</Text>
    </Key>
  ));
  const values = data.map(({ key, value }) => (
    <Value key={`${key}-value`}>
      <Text>{value}</Text>
    </Value>
  ));

  return (
    <Container>
      <Column>{keys}</Column>
      <Column>{values}</Column>
    </Container>
  );
};

export default Table;
