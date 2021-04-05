import axios from 'axios';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setDisplays, setStatusToDisplays } from '../actions';

const EndPointConfig = ({
  displays,
  setDisplays,
  setStatusToDisplays,
}) => {
  const [sc1, setSc1] = useState(displays[0].ip);
  const [sc2, setSc2] = useState(displays[1].ip);
  const [sc3, setSc3] = useState(displays[2].ip);
  
  const [sc1status, setSc1status] = useState(false);
  const [sc2status, setSc2status] = useState(false);
  const [sc3status, setSc3status] = useState(false);

  const updateDisplayIP = (index, ip) => {
    setDisplays([
      ...displays.map(display => {
        if(displays.indexOf(display) === index ) return {...display, ip}; 
        else return display;
      })
    ])
  }
  
  const checkIP = (displayName, displayCallBack, storeCallback) => {
    axios.get(`http://${displayName}`, {timeout: 500})
    .then(resp => {
      console.log(resp.data);
      displayCallBack(true);
      storeCallback(displayName, true);
    })
    .catch(err => {
      console.log(err);
      displayCallBack(false);
      storeCallback(displayName, false);
    })
  }

  

  useEffect(()=>{
    checkIP(sc1,setSc1status, setStatusToDisplays);
  }, [sc1])

  useEffect(()=>{
    checkIP(sc2, setSc2status, setStatusToDisplays)
  }, [sc2])
  
  useEffect(()=>{
    checkIP(sc3, setSc3status, setStatusToDisplays)
  }, [sc3])

  useEffect(()=>{
    checkIP(sc1, setSc1status, setStatusToDisplays);
    checkIP(sc2, setSc2status, setStatusToDisplays)
    checkIP(sc3, setSc3status, setStatusToDisplays)
  }, [])

  return (
    <div className='card endpoint'>
      <div className="field">
        <label className="label is-small">Display 1:</label>
        <input 
          className={`input is-small ${sc1status ? 'is-success' : 'is-danger'}`}
          type="text" value={sc1} 
          onChange={e => {setSc1(e.target.value); updateDisplayIP(0, e.target.value)}}
        />
      </div>
      <div className="field">
        <label className="label is-small">Display 2:</label>
        <input 
          className={`input is-small ${sc2status ? 'is-success' : 'is-danger'}`}
          type="text" value={sc2} 
          onChange={e => {setSc2(e.target.value); updateDisplayIP(1, e.target.value)}}
        />
      </div>
      <div className="field">
        <label className="label is-small">Display 3:</label>
        <input 
          className={`input is-small ${sc3status ? 'is-success' : 'is-danger'}`}
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
  setStatusToDisplays: (ip, status) => dispatch(setStatusToDisplays(ip, status)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EndPointConfig)