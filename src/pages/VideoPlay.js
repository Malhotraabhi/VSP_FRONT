import React, { useEffect, useState } from 'react'
import '../Styles/videoplay.css'
import VideoItem from '../component/VideoItem'
import Navbar from '../component/Navbar'
import { useParams } from 'react-router-dom'
import { GetvideoForPlay, getLessvideos } from '../data-store/api-utils'
const VideoPlay = () => {
    let {videoId}=useParams();
    let [playVideo,setplayVideo]=useState([])
    let [relatedVideo,setRelatedvideo]=useState([])
    useEffect(()=>{
        async function fetchdata(){
        let response= await GetvideoForPlay(videoId)
        console.log(response.data)
        setplayVideo(response.data)
        let relatedData=await getLessvideos(3)
        console.log(relatedData.data)
        setRelatedvideo(relatedData.data)
        }
        fetchdata()
    },[videoId])
    return (
        <>
        <Navbar/>
        <div id='conatainer'>
            <div className="left">
                <video controls  >
                    <source src={`http://localhost:9000/Videos/${playVideo[0]?.Video}`} type='video/Mp4' />
                </video>
                <div id='video-footer'>
                    <div id="left">
                        <div className="profile"><img src={`http://localhost:9000/Pictures/${playVideo[0]?.PublisherProfilePic}`} alt="Publisher" /></div>
                        <div id='title'><h3>{playVideo[0]?.title}</h3></div>
                    </div>
                    <div id="right">
                        <span id="date">{playVideo[0]?.date}</span>
                        <span id="duration">{playVideo[0]?.duration} Mins</span>
                        <span id="views">{playVideo[0]?.views} Views</span>
                    </div>
                </div>
            </div>
            <div className="right">
           {relatedVideo.map((item)=><VideoItem key={item._id} item={item}/>) }
            
            </div>
        </div>
        </>
    )
}

export default VideoPlay
