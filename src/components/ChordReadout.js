import React from "react";
import Text from "./Text";

const ChordReadout = ({ chords }) => {
  return <Text large>{chords[0] || "-"}</Text>;
};

export default ChordReadout;
