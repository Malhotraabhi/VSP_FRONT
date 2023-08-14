import React, { useEffect, useState } from "react";
import "../Styles/videoplay.css";
import VideoItem from "../component/VideoItem";
import Navbar from "../component/Navbar";
import { useParams } from "react-router-dom";
import { GetvideoForPlay, getLessvideos } from "../data-store/api-utils";
import endgame from '../Assets/endgame.mp4'
const VideoPlay = () => {
  let { videoId } = useParams();
  let [playVideo, setplayVideo] = useState([]);
  let [relatedVideo, setRelatedvideo] = useState([]);
  useEffect(() => {
    async function fetchdata() {
      let response = await GetvideoForPlay(videoId);
      console.log(response.data);
      setplayVideo(response.data);
      let relatedData = await getLessvideos(3);
      console.log(relatedData.data);
      setRelatedvideo(relatedData.data);
    }
    fetchdata();
  }, [videoId]);
//   let video_streme=playVideo.Video;
//   console.log(video_streme)
  return (
    <>
      <Navbar />
      <div id="conatainer">
        <div className="left">
          {/* <video controls autoPlay>
            <source
              src={`http://localhost:9000/Videos/${playVideo?.Video}`}
              type="video/mp4"
            />
          </video> */}
          <video controls>
            <source
              src={endgame}
              type="video/mp4"
            />
          </video>

          <div id="video-footer">
            <div id="left">
              <div className="profile">
                <img
                  src={`http://localhost:9000/Pictures/${playVideo?.PublisherProfilePic}`}
                  alt="Publisher"
                />
              </div>
              <div id="title">
                <h3>{playVideo[0]?.title}</h3>
              </div>
            </div>
            <div id="right">
              <span id="date">{playVideo?.date}</span>
              <span id="duration">{playVideo?.duration} Mins</span>
              <span id="views">{playVideo?.views} Views</span>
            </div>
          </div>
        </div>
        <div className="right">
          {relatedVideo.map((item) => (
            <VideoItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoPlay;
