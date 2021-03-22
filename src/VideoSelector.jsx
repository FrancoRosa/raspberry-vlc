import ReactPlayer from 'react-player';

const VideoSelector = () => {
  return (
    <div className="card column is-one-third videoselector">
      <div className="card-image">
        <ReactPlayer
          url={''}
          playing={true}
          controls
          width='100%'
          height='60vh'
        />
      </div>
      <div className="card-content">
        <button className="button">Select</button>
        <button className="button">Upload</button>
      </div>
    </div>
  )
}

export default VideoSelector;