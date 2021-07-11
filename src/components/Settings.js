import React from "react";
import Text from "./Text";
import VerticalStack from "./VerticalStack";

const Settings = ({ settings: { startingOctave, totalOctaves } }) => {
  return (
    <VerticalStack>
      <Text small>Starting Octave: {startingOctave}</Text>
      <Text small>Total Octaves: {totalOctaves}</Text>
    </VerticalStack>
  );
};

export default Settings;
