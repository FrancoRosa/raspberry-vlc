import { connect } from "react-redux";
import AddCard from "./AddCard";
import SetCard from "./SetCard";

const SetBrowser = ({ videosets }) => {
  return (
    <nav className="panel">
      <p className="panel-heading"> List of sets</p>
      {videosets.map(videoset => <SetCard setInfo={videoset} />)}
      <AddCard />
    </nav>
  );
};

const mapStateToProps = state => ({
  videosets: state.videosets,
})

export default connect(mapStateToProps)(SetBrowser);