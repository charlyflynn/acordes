import { createContext, useState } from "react";

const MidiContext = createContext();

const defaultSettings = {
  startingOctave: { displayName: "Starting Octave", value: 3 },
  totalOctaves: { displayName: "Total Octaves", value: 3 },
};

const MidiContextProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  return (
    <MidiContext.Provider value={{ settings, setSettings }}>
      {children}
    </MidiContext.Provider>
  );
};

export { MidiContext, MidiContextProvider };
