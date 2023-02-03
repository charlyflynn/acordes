import { MainPage, DesktopOnly } from "components";
import { isDesktop } from "react-device-detect";

function App() {
  return isDesktop ? <MainPage /> : <DesktopOnly />;
}

export default App;
