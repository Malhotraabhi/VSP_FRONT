import React, { useEffect, useState } from 'react';
import '../Styles/home.css'
import VideoItem from '../component/VideoItem';
import Movie from '../component/Movie';
import '../Styles/movie.css';
import Navbar from '../component/Navbar';
import UploadVideo from '../component/UploadVideo';
import { getAllvideos, getLessvideos, searchVideoWithQuery } from '../data-store/api-utils';
import { useSelector } from 'react-redux';
import SearchResult from './SearchResult';
import { Link } from 'react-router-dom';
let timeoutId = null
function Home() {
  let [upload, setUpload] = useState(false)
  let [videos, setVideos] = useState([])
  let [queriedvideos, setqueriedvideos] = useState([])
  let [lessVideos, setLessVideos] = useState(true)
  let [bannerIndex, setBannerIndex] = useState(0)
  let [error, setError] = useState("")
  let query = useSelector((state) => {
    return state.Query.query
  })

  useEffect(() => {

    if (lessVideos) {
      getLessvideos(4)
        .then((data) => {
          if (data) {
            console.log("this is also running")
            setVideos(data.data)
            setBannerIndex(Math.floor(Math.random() * data.data.length))
          }
        })
    } else {
      getAllvideos()
        .then((data) => {
          if (data) {
            setVideos(data.data)
            setBannerIndex(Math.floor(Math.random() * data.data.length))
          }
        })
    }

  }, [lessVideos])

  useEffect(() => {
    setqueriedvideos([])
    timeoutId = setTimeout(() => {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      if (query) {
        searchVideoWithQuery(query)
          .then((data) => {
            if (data.message === "Fetch Videos Successfully") {
              setqueriedvideos(data.data)
            } else if (data.message === "Videos Not Found") {
              setError("Videos Not Found")
            }
            timeoutId = null
          }).catch((err) => {
            setError("Something went Wrong")
            timeoutId = null
          })
      }

    }, 1000);



  }, [query])

function onUpload(){
  setUpload(true)
}
function offUpload(){
  setUpload(false)
}


  return (
    <div className="home-container">
      <Navbar onUpload={onUpload} />
      {upload && <UploadVideo offUpload={offUpload} />}
      {query ? <SearchResult error={error} videos={queriedvideos} /> :
        <>
          <Movie item={videos?.[bannerIndex]} />
          <div id='item-list'>
            <div id='top'>
              <span>Recent</span>
              {lessVideos ? <span className='action' onClick={() => setLessVideos(false)}>View All</span> :
                <span className='action' onClick={() => setLessVideos(true)}>View less</span>
              }
            </div>

            {videos?.map((Item) => <Link to={`/playvideos/${Item._id}`}><VideoItem key={Item._id} item={Item} /></Link>)}
          </div>
        </>}
    </div>
  );
}

export default Home;
