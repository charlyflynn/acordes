import { createContext, useEffect, useState } from "react";
import { noteUtils } from "utils";

const MidiContext = createContext();

const defaultSettings = {
  octaveStart: { displayName: "Starting octave", value: 3 },
  octaveSpan: { displayName: "Octaves spanned", value: 3 },
};
const activeNotesDefault = [...Array(127).fill(false)];

const onMIDIFailure = () => {
  window.alert("Midi access failure");
  console.log("Midi access failure");
};

const MidiContextProvider = ({ children }) => {
  const [settings] = useState(defaultSettings);
  const [devices, setDevices] = useState([]);
  const [activeNotes, setactiveNotes] = useState(activeNotesDefault);

  useEffect(() => {
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMIDISuccess = (access) => {
    if (access.inputs.size > 0) setDevices(access.inputs);
    else setDevices([]);

    for (var input of access.inputs.values())
      input.onmidimessage = (midiMessage) => {
        getMIDIMessage(midiMessage);
      };
  };

  const getMIDIMessage = (midiMessage, currentNotes) => {
    const [midiCmd, noteID, velocity] = midiMessage.data;
    if (midiCmd === 144 && velocity > 0) {
      setactiveNotes([
        ...activeNotes.slice(0, noteID),
        true,
        ...activeNotes.slice(noteID, activeNotes.length),
      ]);
      // activeNotes.current[noteID] = true;
    } else if (midiCmd === 128 || velocity === 0) {
      setactiveNotes([
        ...activeNotes.slice(0, noteID),
        false,
        ...activeNotes.slice(noteID, activeNotes.length),
      ]);
    }
  };

  const activeNotesReal = noteUtils.extractNotes(activeNotes);

  return (
    <MidiContext.Provider
      value={{
        settings,
        devices,
        activeNotes,
        activeNotesReal,
      }}
    >
      {children}
    </MidiContext.Provider>
  );
};

export { MidiContext, MidiContextProvider };
