import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setBlurToVideoSet } from "../actions";

const BlurSelector = ({ videosets, setBlurToVideoSet }) => {
  let videoset = videosets.filter(videoset => videoset.selected == true)[0]
  const [blur, setBlur] = useState(videoset.blur);
  
  useEffect(()=>{
    videoset = videosets.filter(videoset => videoset.selected == true)[0]
    setBlur(videoset ? videoset.blur : 0);
  },[videosets])

  const updateBlur = e => {
    const value = parseFloat(e.target.value).toFixed(1);
    setBlur(value);
    setBlurToVideoSet(value);

  }

  return (
    <div className="blurselector">
      <div className="field">
        <label className="label">Blur index:</label>
        <input 
          className="slider" 
          step="0.1" min="0" max="10" 
          value={blur} type="range"
          onInput={updateBlur}
        />
        <p>{blur}</p>
      </div>
    </div>
  )
}



const mapStateToProps = state => ({
  videosets: state.videosets,
})

const mapDispatchToProps = dispatch => ({
  setBlurToVideoSet: (blur) => dispatch(setBlurToVideoSet(blur)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BlurSelector);