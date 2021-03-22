import { useState } from 'react';

const EndPointConfig = () => {
  const [sc1, setSc1] = useState('');
  const [sc2, setSc2] = useState('');
  const [sc3, setSc3] = useState('');

  return (
    <div className='card endpoint'>
      <div className="field">
        <label className="label is-small">Display 1:</label>
        <input 
          className="input is-small"
          type="text" value={sc1} 
          onChange={e => setSc1(e.target.value)}
        />
      </div>
      <div className="field">
        <label className="label is-small">Display 2:</label>
        <input 
          className="input is-small"
          type="text" value={sc2} 
          onChange={e => setSc2(e.target.value)}
        />
      </div>
      <div className="field">
        <label className="label is-small">Display 3:</label>
        <input 
          className="input is-small"
          type="text" value={sc3} 
          onChange={e => setSc3(e.target.value)}
        />
      </div>
    </div>
  )
}

export default EndPointConfig;