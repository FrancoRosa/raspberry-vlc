import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';

const VideoSelector = ({ box, display }) => {
  const [path, setPath] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState();
  const [exists, setExists] = useState(false);
  const {ip, saved, enabled} = display

  const handleFiles = e => {
    let localPath = URL.createObjectURL(e.target.files[0]);
    let localName = e.target.files[0].name
    setFile(e.target.files[0])
    setPath(localPath)
    setName(localName)
  }

  const processVideo = () => {
    let formData = new FormData();
    formData.append('sampleFile', file)
    const url = `http://${ip}/api/videos`
    if (enabled && exists) {
      axios.delete(url, name)
      console.log('... delete video')
    }
    if (enabled && !exists) {
      axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log('... upload video')
    }
  }

  useEffect(()=>{
    const inputElement = document.querySelector(".videofile"+box);
    inputElement.addEventListener("change", handleFiles, false);
  },[])

  useEffect(()=>{
    console.log('exists',saved.includes(name))
    setExists(saved.includes(name))
  },[name])


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
      
      <div className="card-footer">
        <div className="file has-name file-selector">
          <label className="file-label">
            <input className={"file-input videofile"+box} type="file" name="resume"/>
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"></i>
              </span>
              <span className="file-label">
                Select video
              </span>
            </span>
            <span className="file-name">
              {name}
            </span>
          </label>
        </div>
        <button 
          className={
            `button card-footer-item is-outlined ${(exists && name) ? 'is-danger': 'is-success'}`
          }
          onClick={processVideo}
          disabled={(name && enabled) ? false : true}
        >
          {exists ? 'Delete' : 'Upload'}
        </button>
      </div>
    </div>
  )
}

export default VideoSelector;