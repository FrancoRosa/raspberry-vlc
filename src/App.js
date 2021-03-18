import ConfigManager from "./ConfigManager"

const App = () => {
  return (
    <div className="container">
      <div className="columns">
        <ConfigManager identifier="1" />
        <ConfigManager identifier="2" />
        <ConfigManager identifier="3" />
      </div>
    </div>
  );
}

export default App;
