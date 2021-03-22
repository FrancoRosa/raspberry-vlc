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
          height='50vh'
        />
      </div>
      <div className="card-footer">
        <button className="button card-footer-item">Select</button>
        <button className="button card-footer-item">Upload</button>
      </div>
    </div>
  )
}

export default VideoSelector;