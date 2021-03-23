import { useState } from "react";
const BlurSelector = () => {
  const [blur, setBlur] = useState(0);
  return (
    <div className="blurselector">
      <div className="field">
        <label className="label">Blur index:</label>
        <input 
          className="slider" 
          step="0.1" min="0" max="10" 
          value={blur} type="range"
          onChange={e => setBlur(parseInt(e.target.value).toFixed(1))}
        />
        <p>{blur}</p>
      </div>
      
    </div>
  )
}

export default BlurSelector;