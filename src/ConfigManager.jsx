import { useState } from "react";
import axios from 'axios';

const ConfigManager = () => {
  const [mainIP, setMainIP] = useState('')
  
  const Device = () => {
    const [ip, setIP] = useState('');
    const deviceTest = () => {
      const url=`http://${ip}:9999`
      console.log(url)
      setMainIP(ip)
      document.querySelector('.device-test').textContent='';
      axios.get(url)
        .then(resp => {
          console.log(resp.data);
          document.querySelector('.device-test').textContent=resp.data;
        })
        .catch(err => {
          console.log(err);
          document.querySelector('.device-test').textContent='Device not working';
        });
    }
    const updateIP = event => {
      setIP(event.target.value);
    } 
  
    return (
      <section className='section' id='device'>
        <h1>Device</h1>
        <input class="input" type="text" 
          placeholder="192.168.0.12"
          value={ip}
          onChange={updateIP}
        />
        <button className="button" onClick={deviceTest}>test</button>
        <p className="device-test"></p>
      </section>
    );
  };
  
  return (
    <div className="column">
      <Device />      
      <section className='section' id='table'>
        <h1>Videos</h1>
        <table className="table">
          for
        </table>
        <button className='button'>Refresh</button>
      </section>
    </div>
  );
}

export default ConfigManager;