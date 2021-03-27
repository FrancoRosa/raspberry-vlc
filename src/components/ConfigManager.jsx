import { useState } from "react";
import axios from 'axios';

const ConfigManager = ({ identifier }) => {
  const [ip, setIP] = useState('');
  const [videos, setVideos] = useState([]);

  const deviceTest = () => {
    const url=`http://${ip}:9999`
    console.log(url)
    axios.get(url, {timeout: 1000})
      .then(resp => {
        console.log(resp.data);
        document.querySelector('.device-test-'+identifier).textContent=resp.data;
      })
      .catch(err => {
        console.log(err);
        document.querySelector('.device-test-'+identifier).textContent='... device not working';
      });
  }
  
  const updateIP = event => {
    setIP(event.target.value);
  } 
  
  const getVideos = () => {
    const url=`https://${ip}:9999/api/videos`
    axios.get(url, {timeout: 1000})
      .then(resp => {
        console.log(resp.data);
        setVideos(resp.data);
      })
      .catch(err => {
        console.log(err);
        setVideos([])
      })
  }
  

  const playVideos = () => {
    const url=`https://${ip}:9999/api/videos/play`
    axios.get(url, {timeout: 1000})
      .then(resp => {
        console.log(resp.data)
      })
      .catch(err => {
        console.log(err);
      });
  }

  const stopVideos = () => {
    const url=`https://${ip}:9999/api/videos/stop`
    axios.get(url, {timeout: 1000})
      .then(resp => {
        console.log(resp.data)
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="column">
      <section className='section' id='device'>
        <h1>Device: {ip}</h1>
        <div className="field is-grouped">
          <input class="input" type="text" 
            placeholder="192.168.0.12"
            value={ip}
            onChange={updateIP}
          />
          <button className="button" onClick={deviceTest}>Test</button>
        </div>
        <p className={"device-test-"+identifier}></p>
      </section>     
      
      <section className='section' id='table'>
        <h1>Videos</h1>
        <button className="button" onClick={getVideos}>Get videos</button>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Enable</th>
              <th>Blur</th>
            </tr>
          </thead>
          <tbody>
            {videos.map(video => 
              <tr>
                <td>{video.id}</td>
                <td>{video.enable}</td>
                <td>{video.blur}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <section className='section' id='upload'>
        
      </section>
      <section className='section' id='media-control'>
        <button className="button" onClick={playVideos}>play</button>
        <button className="button" onClick={stopVideos}>stop</button>
      </section>
    </div>
  );
}

export default ConfigManager;