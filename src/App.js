import ConfigManager from "./ConfigManager"
import SetBrowser from "./SetBrowser";
import SetDetail from "./SetDetail";

const App = () => {
  return (
    <div className="columns">
      <SetBrowser />
      <SetDetail />
      {/* <ConfigManager identifier="1" />
      <ConfigManager identifier="2" />
      <ConfigManager identifier="3" /> */}
    </div>
  );
}

export default App;
