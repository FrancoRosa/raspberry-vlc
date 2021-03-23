
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const VideoSelector = () => {
  const [path, setPath] = useState('');
  const [name, setName] = useState('Nothing selected yet');

  const handleFiles = e => {
    let localPath = URL.createObjectURL(e.target.files[0]);
    let localName = e.target.files[0].name
    setPath(localPath)
    setName(localName)
  }

  useEffect(()=>{
    const inputElement = document.querySelector(".file-input");
    inputElement.addEventListener("change", handleFiles, false);
  },[])

  return (
    <div className="card column is-one-third videoselector">
      <div className="card-image">
        <ReactPlayer
          url={path}
          playing={true}
          controls
          width='100%'
          height='50vh'
        />
      </div>
      
      <div className="file has-name file-selector">
        <label className="file-label">
          <input className="file-input" type="file" name="resume"/>
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span>
            <span className="file-label">
              Choose a file to play ...
            </span>
          </span>
          <span className="file-name">
            {name}
          </span>
        </label>
      </div>
      
      
      <div className="card-footer">
        <button className="button card-footer-item">Select</button>
        <button className="button card-footer-item">Upload</button>
      </div>
    </div>
  )
}

export default VideoSelector;