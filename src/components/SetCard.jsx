import axios from "axios";
import { connect } from "react-redux";
import { selectVideoSet } from "../actions";


const SetCard = ({ setInfo, selectVideoSet, videosets, displays }) => {
  const { setTitle, selected, id } = setInfo;
  const playSet = () => {
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