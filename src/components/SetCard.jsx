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

  const activateSet = () => {
    console.log('... activateSet')
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

const mapDispatchToProps = dispatch => ({
  selectVideoSet: id => dispatch(selectVideoSet(id))
})
export default connect(null, mapDispatchToProps)(SetCard);