import ConfigManager from "./ConfigManager"
import EndPointConfig from "./EndPointConfig";
import SetBrowser from "./SetBrowser";
import SetDetail from "./SetDetail";

const App = () => {
  return (
    <div className="columns">
      <div className="column is-one-quarter">
        <SetBrowser />
        <EndPointConfig />
      </div>
      <div className="column">
        <SetDetail setTitle="The Beautiful Mountains"/>
      </div>
    </div>
  );
}

export default App;
