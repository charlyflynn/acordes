import { Text, VerticalStack } from "components";
import React from "react";

const Settings = ({ settings: { startingOctave, totalOctaves } }) => {
  return (
    <VerticalStack>
      <Text small>Starting Octave: {startingOctave}</Text>
      <Text small>Total Octaves: {totalOctaves}</Text>
    </VerticalStack>
  );
};

export default Settings;
