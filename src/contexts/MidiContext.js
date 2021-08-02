import { createContext, useEffect, useRef, useState } from "react";
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
  const [activeNotes, setActiveNotes] = useState(activeNotesDefault);

  const noteRef = useRef(activeNotesDefault);

  useEffect(() => {
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMIDISuccess = (access) => {
    if (access.inputs.size > 0) setDevices(access.inputs);
    else setDevices([]);

    for (var input of access.inputs.values())
      input.onmidimessage = (midiMessage) => {
        console.log(midiMessage);
        getMIDIMessage(midiMessage);
      };
  };

  console.log("noteRef", noteRef);
  console.log("activeNotes", activeNotes);
  const getMIDIMessage = (midiMessage) => {
    const [midiCmd, noteID, velocity] = midiMessage.data;
    console.log("midiMessage", midiCmd, noteID, velocity);
    if (midiCmd === 144 && velocity > 0) {
      noteRef.current[noteID] = true;
      const newActiveNotes = activeNotes;
      activeNotes[noteID] = true;
      setActiveNotes(newActiveNotes);
      // setactiveNotes([
      //   ...activeNotes.slice(0, noteID),
      //   true,
      //   ...activeNotes.slice(noteID, activeNotes.length),
      // ]);
      // activeNotes.current[noteID] = true;
    } else if (midiCmd === 128 || velocity === 0) {
      const newActiveNotes = activeNotes;
      activeNotes[noteID] = true;
      setActiveNotes(newActiveNotes);
      // setactiveNotes([
      //   ...activeNotes.slice(0, noteID),
      //   false,
      //   ...activeNotes.slice(noteID, activeNotes.length),
      // ]);
    }
  };

  const activeNotesReal = noteUtils.extractNotes(activeNotes);
  // console.log("notes", activeNotes, activeNotesReal);

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
