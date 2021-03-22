import VideoSelector from "./VideoSelector";

const SetDetail = () => {
  return (
    <div className="details">
      <h1
        className='title'
        
      >
        The Beautiful Mountains</h1>
      <div className="columns">
        <VideoSelector />
        <VideoSelector />
        <VideoSelector />
      </div>
    </div>
  )
}

export default SetDetail;