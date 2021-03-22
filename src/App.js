import ConfigManager from "./ConfigManager"
import EndPointConfig from "./EndPointConfig";
import SetBrowser from "./SetBrowser";
import SetDetail from "./SetDetail";

const App = () => {
  return (
    <div className="columns">
      <div className="column is-one-third">
        <SetBrowser />
        <EndPointConfig />
      </div>
      <div className="column">
        <SetDetail />
      </div>
    </div>
  );
}

export default App;
