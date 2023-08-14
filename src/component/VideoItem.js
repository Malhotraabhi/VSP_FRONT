import React from 'react'
import '../Styles/videoitem.css'
import playButton from'../Assets/play-button.png'
import { useParams } from 'react-router-dom'
const VideoItem = ({item}) => {
  let {videoId}=useParams()
  return (
    <div>
      
      <div id="Item-container">
        <img id="thumbnail"src={`http://localhost:9000/Thumbnails/${item.Thumbnail}`} alt="thumbanail" />
        <div id='play'><img  src={playButton}alt="playbutton" /></div>
        {videoId || <div id='profile'><img src={`http://localhost:9000/Pictures/${item.PublisherProfilePic}`} alt="PublisherProfilePic" /></div>}
        <div id="title"><h3>{item.title}</h3></div>
        <div id="details">
            <span id="date">{item.date}</span>
            <span id="duration">{item.duration}Mins</span>
            <span id="views">{item.views} Views</span>
        </div>
      </div>
      
      
    </div>
  )
}

export default VideoItem
