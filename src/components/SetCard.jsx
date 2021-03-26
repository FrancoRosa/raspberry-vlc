import { connect } from "react-redux";
import { selectVideoSet } from "../actions";

const SetCard = ({ setInfo, selectVideoSet }) => {
  const { setTitle, selected, id } = setInfo;
  const playSet = () => {
    console.log('... play');
  }

  const stopSet = () => {
    console.log('... stop');
  }

  return(
    <a 
      className={`panel-block ${selected ? 'is-active' : ''}`}
      onClick={() => selectVideoSet(id)}
    > 
      <p>{setTitle}</p>
      {selected && <div className="controls">
        <i className="fas fa-play" onClick={playSet}/>
        <i className="fas fa-stop" onClick={stopSet}/>
      </div>}
    </a>
  )
}

const mapStateToProps = state => ({
  videosets: state.videosets,
  displays: state.displays
})

const mapDispatchToProps = dispatch => ({
  selectVideoSet: id => dispatch(selectVideoSet(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SetCard);