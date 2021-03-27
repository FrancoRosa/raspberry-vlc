import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { setSavedDisplays, setVideoToVideoSet} from '../actions';

const VideoSelector = ({
  box,
  display,
  setVideoToVideoSet,
  selectedVideo,
}) => {
  const [path, setPath] = useState(selectedVideo[0]);
  const [name, setName] = useState(selectedVideo[1]);
  const [file, setFile] = useState('');
  const [exists, setExists] = useState(false);
  const {ip, enabled} = display
  const [saved, setSaved] = useState([])

  const getSavedVideos = (displayName, saveCallBack) => {
    axios.get(`http://${displayName}/api/videos`, {timeout: 2000})
    .then(resp => {
      saveCallBack(resp.data)
      setExists(resp.data.includes(name))
    })
    .catch(err => {
      saveCallBack([])
      setExists(false)
    })
  }

  const handleFiles = e => {
    let path = e.target.files[0]
    let localPath = URL.createObjectURL(path);
    let localName = path.name
    setFile(e.target.files[0])
    setPath(localPath)
    setName(localName)
    setVideoToVideoSet(box,[localPath, localName])
  }

  const processVideo = event => {
    const url = `http://${ip}/api/videos`
    if (enabled && exists) {
      event.target.classList.add('is-loading');
      axios.delete(url + '/' + name)
      .then(() => {
        let index = saved.indexOf(name);
        let savedvids = [...saved]
        savedvids.splice(index, 1)
        setSaved(savedvids);
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
      console.log('___ FILE ___')
      console.log(file)
      console.log('________________')
      event.target.classList.add('is-loading');
      axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(() => {
        let savedvids = [...saved]
        savedvids.push(name);
        setSaved(savedvids);
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
    getSavedVideos(ip, setSaved)
  },[])

  useEffect(()=>{
    getSavedVideos(ip, setSaved)
    setExists(saved.includes(name))
  },[name])

  useEffect(()=>{
    setPath(selectedVideo ? selectedVideo[0] : '')
    setName(selectedVideo ? selectedVideo[1] : '')
    getSavedVideos(ip, setSaved)
  },[selectedVideo])

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
          disabled={((exists || file) && enabled) ? false : true}
        >
          {exists ? 'Delete' : 'Upload'}
        </button>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setVideoToVideoSet: (index, video) => dispatch(setVideoToVideoSet(index, video))
})

export default connect(null, mapDispatchToProps)(VideoSelector);
