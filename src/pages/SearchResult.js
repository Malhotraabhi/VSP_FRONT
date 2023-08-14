import React from 'react'
import VideoItem from '../component/VideoItem'
import '../Styles/searchResult.css'
import { Link } from 'react-router-dom'
function SearchResult({videos,error}) {
  console.log(videos)
  console.log(error)
  return (
    <div id='queried-videos-container'>
      
     { videos.map((Item)=> <Link to={`/playvideos/${Item._id}`}><VideoItem item={Item}/></Link>)}
    </div>
  )
}

export default SearchResult
