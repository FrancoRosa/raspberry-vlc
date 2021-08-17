import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { connect } from "react-redux";
import { selectVideoSet } from "../actions";


const SetCard = ({ setInfo, selectVideoSet, videosets, displays }) => {
  const { setTitle, selected, id } = setInfo;
  const playSet = () => {
    console.log('... play set')
    
    let url = '';
    let videoset = videosets.filter(videoset => videoset.selected)[0]
    url = `http://${displays[0].ip}/api/play`;
    axios.post(url,{video: videoset.videos[0][1], blur: videoset.blur})
    url = `http://${displays[1].ip}/api/play`;
    axios.post(url,{video: videoset.videos[1][1], blur: 2*videoset.blur})
    url = `http://${displays[2].ip}/api/play`;
    axios.post(url,{video: videoset.videos[2][1], blur: 2*videoset.blur})
  }

  const stopSet = () => {
    console.log('... stop set')
    let url = '';
    displays.forEach(display => {
      url = `http://${display.ip}/api/stop`;
      axios.get(url)
    });
  }

  return(
    <a 
      className={`panel-block ${selected ? 'is-active' : ''}`}
      onClick={() => selectVideoSet(id)}
    > 
      <p>{setTitle}</p>
      {selected && <div className="controls">
        <FontAwesomeIcon icon={faPlay} onClick={playSet} title="play" />
        <FontAwesomeIcon icon={faStop} onClick={stopSet} title="stop" />
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