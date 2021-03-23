import { useState } from "react";
import BlurSelector from "./BlurSelector";
import VideoSelector from "./VideoSelector";

const SetDetail = ({ setTitle }) => {
  const [header, setHeader] = useState(setTitle)
  
  return (
    <div className="details">
      <input type="text" value={header} className="title title-input" onChange={e => setHeader(e.target.value)}/>
      <div className="columns">
        <VideoSelector />
        <VideoSelector />
        <VideoSelector />
      </div>
      <BlurSelector />
    </div>
  )
}

export default SetDetail;