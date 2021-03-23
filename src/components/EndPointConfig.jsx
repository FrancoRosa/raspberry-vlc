import axios from 'axios';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setDisplays } from '../actions';

const EndPointConfig = ({ displays, setDisplays }) => {
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
  
  useEffect(()=>{
    axios.get(`http://${sc1}`, {timeout: 2000})
    .then(resp => {
      console.log(resp.data);
      setDisplays([
        ...displays.map(display => {
          if(displays.indexOf(display) === 0 ) return {...display, enabled: true}; 
          else return display;
        })
      ])
    })
    .catch(err => {
      console.log(err);
      setDisplays([
        ...displays.map(display => {
          if(displays.indexOf(display) === 0 ) return {...display, enabled: false}; 
          else return display;
        })
      ])
    })
  }, [sc1])

  
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
          className="input is-small"
          type="text" value={sc2} 
          onChange={e => {setSc2(e.target.value); updateDisplayIP(1, e.target.value)}}
        />
      </div>
      <div className="field">
        <label className="label is-small">Display 3:</label>
        <input 
          className="input is-small"
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
  setDisplays: displays => dispatch(setDisplays(displays))
})

export default connect(mapStateToProps, mapDispatchToProps)(EndPointConfig)