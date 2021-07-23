import { Container } from "components";
import { MidiContextProvider } from "contexts";

function App() {
  return (
    <div className="App">
      <MidiContextProvider>
        <Container />
      </MidiContextProvider>
    </div>
  );
}

export default App;
