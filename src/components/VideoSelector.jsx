import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { setSavedDisplays, setVideoToVideoSet} from '../actions';

const VideoSelector = ({
  box,
  display,
  setSavedDisplays,
  setVideoToVideoSet,
  selectedVideo,
}) => {
  const [path, setPath] = useState(selectedVideo[0]);
  const [name, setName] = useState(selectedVideo[1]);
  const [file, setFile] = useState();
  const [exists, setExists] = useState(false);
  const {ip, saved, enabled} = display

  const handleFiles = e => {
    let path = e.target.files[0]
    let localPath = URL.createObjectURL(path);
    let localName = path.name
    setFile(e.target.files[0])
    setPath(localPath)
    setName(localName)
    console.log('>>>>>>>>')
    console.log(path)
    console.log(localPath)
    console.log(localName)
    console.log('>>>>>>>>')
    setVideoToVideoSet(box,[localPath, localName])
  }

  const processVideo = event => {
    
    const url = `http://${ip}/api/videos`
    if (enabled && exists) {
      event.target.classList.add('is-loading');
      axios.delete(url + '/' + name)
      .then(() => {
        let index = saved.indexOf(name);
        saved.splice(index,1);
        setSavedDisplays(ip, saved);
        setPath('');
        setName('');
        event.target.classList.remove('is-loading');
      },err => {
        console.error(err);
        event.target.classList.remove('is-loading');
      })
    }
    if (enabled && !exists) {
      let formData = new FormData();
      formData.append('sampleFile', file)
      event.target.classList.add('is-loading');
      axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(() => {
        saved.push(name);
        setSavedDisplays(ip, saved);
        setExists(true);
        event.target.classList.remove('is-loading');
      }, err => {
        console.error(err)
        event.target.classList.remove('is-loading');
      })
    }
  }

  useEffect(()=>{
    const inputElement = document.querySelector(".videofile"+box);
    inputElement.addEventListener("change", handleFiles, false);
  },[])

  useEffect(()=>{
    setExists(saved.includes(name))
  },[name])

  useEffect(()=>{
    setFile()
    setPath(selectedVideo ? selectedVideo[0] : '')
    setName(selectedVideo ? selectedVideo[1] : '')
  },[selectedVideo])

  return (
    <div className="card column is-one-third videoselector">
      <div className="card-image">
        <ReactPlayer
          url={path}
          playing={false}
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
              <span className="file-icon has-text-success">
                <i className="fas fa-upload"></i>
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

const mapDispatchToProps = dispatch => ({
  setSavedDisplays: (ip, saved) => dispatch(setSavedDisplays(ip, saved)),
  setVideoToVideoSet: (index, video) => dispatch(setVideoToVideoSet(index, video))
})

export default connect(null, mapDispatchToProps)(VideoSelector);
