import axios from 'axios';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setDisplays, setSavedDisplays } from '../actions';

const EndPointConfig = ({ displays, setDisplays, setSavedDisplays }) => {
  const [sc1, setSc1] = useState(displays[0].ip);
  const [sc2, setSc2] = useState(displays[1].ip);
  const [sc3, setSc3] = useState(displays[2].ip);
  
  const updateDisplayIP = (index, ip) => {
    setDisplays([
      ...displays.map(display => {
        if(displays.indexOf(display) === index ) return {...display, ip}; 
        else return display;
      })
    ])
  }
  
  const checkIP = (displayName, displayArray, displayCallBack) => {
    axios.get(`http://${displayName}`, {timeout: 2000})
    .then(resp => {
      console.log(resp.data);
      displayCallBack([
        ...displayArray.map(display => {
          if(displayArray.indexOf(display) === 0 ) return {...display, enabled: true}; 
          else return display;
        })
      ])
    })
    .catch(err => {
      console.log(err);
      displayCallBack([
        ...displayArray.map(display => {
          if(displayArray.indexOf(display) === 0 ) return {...display, enabled: false}; 
          else return display;
        })
      ])
    })
  }

  const getSavedVideos = (displayName, saveCallBack) => {
    axios.get(`http://${displayName}/api/videos`, {timeout: 2000})
    .then(resp => {
      console.log(resp.data);
      saveCallBack(displayName, resp.data)
    })
    .catch(err => {
      console.log(err);
      saveCallBack(displayName, [])
    })
  }

  useEffect(()=>{
    checkIP(sc1, displays, setDisplays);
    getSavedVideos(sc1, setSavedDisplays);
  }, [sc1])

  useEffect(()=>{
    checkIP(sc2, displays, setDisplays)
    getSavedVideos(sc2, setSavedDisplays);
  }, [sc2])
  
  useEffect(()=>{
    checkIP(sc3, displays, setDisplays)
    getSavedVideos(sc3, setSavedDisplays);
  }, [sc3])

  
  return (
    <div className='card endpoint'>
      <div className="field">
        <label className="label is-small">Display 1:</label>
        <input 
          className={`input is-small ${displays[0].enabled ? 'is-success' : 'is-danger'}`}
          type="text" value={sc1} 
          onChange={e => {setSc1(e.target.value); updateDisplayIP(0, e.target.value)}}
        />
      </div>
      <div className="field">
        <label className="label is-small">Display 2:</label>
        <input 
          className={`input is-small ${displays[1].enabled ? 'is-success' : 'is-danger'}`}
          type="text" value={sc2} 
          onChange={e => {setSc2(e.target.value); updateDisplayIP(1, e.target.value)}}
        />
      </div>
      <div className="field">
        <label className="label is-small">Display 3:</label>
        <input 
          className={`input is-small ${displays[2].enabled ? 'is-success' : 'is-danger'}`}
          type="text" value={sc3} 
          onChange={e => {setSc3(e.target.value); updateDisplayIP(2, e.target.value)}}
        />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  displays: state.displays,
})

const mapDispatchToProps = dispatch => ({
  setDisplays: displays => dispatch(setDisplays(displays)),
  setSavedDisplays: (ip, saved) => dispatch(setSavedDisplays(ip, saved))
})

export default connect(mapStateToProps, mapDispatchToProps)(EndPointConfig)