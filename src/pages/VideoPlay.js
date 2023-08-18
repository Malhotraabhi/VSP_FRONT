import React, { useEffect, useState } from "react";
import "../Styles/videoplay.css";
import VideoItem from "../component/VideoItem";
import Navbar from "../component/Navbar";
import { Link, useParams } from "react-router-dom";
import { GetvideoForPlay, getLessvideos } from "../data-store/api-utils";
import endgame from "../Assets/endgame.mp4";
import Loder from "../component/Loder";
const VideoPlay = () => {
  let { videoId } = useParams();
  const [loder, setloder] = useState(false);
  let [playVideo, setplayVideo] = useState([]);
  let [relatedVideo, setRelatedvideo] = useState([]);
  useEffect(() => {
    setloder(true);
    async function fetchdata() {
      let response = await GetvideoForPlay(videoId);
      console.log(response.data);
      setplayVideo([response.data]);
      let relatedData = await getLessvideos(3);
      console.log(relatedData.data);
      setRelatedvideo(relatedData.data);
      setloder(false);
    }
    fetchdata();
  }, [videoId]);

  return (
    <>
      <Navbar />
      {loder ? (
        <Loder />
      ) : (
        <div id="conatainer">
          {playVideo.map((item) => (
            <div className="left">
              <video controls autoPlay>
                {/* <source
                  src={`http://localhost:9000/Videos/${item?.Video}`}
                  type="video/mp4"
                /> */}
                <source
                  src={`https://v-sharing.onrender.com/Videos/${item?.Video}`}
                  type="video/mp4"
                />
              </video>

              <div id="video-footer">
                <div id="left">
                  <div className="profile">
                    <img
                      src={`https://v-sharing.onrender.com/Pictures/${item?.PublisherProfilePic}`}
                      alt="Publisher"
                    />
                  </div>
                  <div id="title">
                    <h3>{item?.title}</h3>
                  </div>
                </div>
                <div id="right">
                  <span id="date">{item?.date}</span>
                  <span id="duration">{item?.duration} Mins</span>
                  <span id="views">{item?.views} Views</span>
                </div>
              </div>
            </div>
          ))}

          <div className="right">
            {relatedVideo.map((item) => (
              <Link to={`/playvideos/${item._id}`}>
                <VideoItem key={item._id} item={item} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPlay;
