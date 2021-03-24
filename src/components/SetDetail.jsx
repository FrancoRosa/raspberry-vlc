import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { removeFromVideoSets, setTitleToVideoSet } from "../actions";
import BlurSelector from "./BlurSelector";
import VideoSelector from "./VideoSelector";

const SetDetail = ({ videosets, setTitleToVideoSet, removeFromVideoSets }) => {
  let videoset = videosets.find(videoset => videoset.selected == true)
  const [header, setHeader] = useState(videoset ? videoset.setTitle: '')

  const updateHeader = e => {
    setHeader(e.target.value);
    setTitleToVideoSet(videoset.id, e.target.value);
  }
  
  useEffect(()=>{
    videoset = videosets.find(videoset => videoset.selected === true)
    setHeader(videoset ? videoset.setTitle: '')
  },[videosets])

  return (
    <div>
      {videoset && <div className="details">
        <input type="text" value={header} className="title title-input" onChange={updateHeader}/>
        <div className="columns">
          <VideoSelector box="0"/>
          <VideoSelector box="1"/>
          <VideoSelector box="2"/>
        </div>
        <BlurSelector />
        <span 
          className="icon has-text-danger delete-set"
          onClick={() => removeFromVideoSets(videoset.id)}
        >
          <i className="fas fa-trash"/>
        </span>
      </div>}
    </div>
  )
}

const mapStateToProps = state => ({
  videosets: state.videosets
})

const mapDispatchToProps = dispatch => ({
  setTitleToVideoSet: (id, title) => dispatch(setTitleToVideoSet(id, title)),
  removeFromVideoSets: id => dispatch(removeFromVideoSets(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SetDetail);
