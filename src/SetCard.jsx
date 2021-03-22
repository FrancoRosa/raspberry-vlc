const SetCard = ({title, active}) => {
  const playSet = () => {
    console.log('... play');
  }

  const stopSet = () => {
    console.log('... stop');
  }

  const activateSet = () => {
    console.log('... activateSet')
  }
  return(
    <a 
      className={`panel-block ${active ? 'is-active' : ''}`}
      onClick={activateSet}
    > 
      <p>{title}</p>
      {active && <div className="controls">
        <i className="fas fa-play" onClick={playSet}/>
        <i className="fas fa-stop" onClick={stopSet}/>
      </div>}
    </a>
  )
}

export default SetCard;