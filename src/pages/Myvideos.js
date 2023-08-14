import React, { useCallback, useEffect, useState } from "react";
import "../Styles/myvideos.css";
// let navigate=useNavigate()
import VideoItem from "../component/VideoItem";
import { useSelector } from "react-redux";

import { DeleteUsersVideo, getUsersVideo } from "../data-store/api-utils";
import Navbar from "../component/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";

export function VideoDetails({ videos, deleteVideo }) {
  let navigate = useNavigate();
  let [video, setVideo] = useState([]);
  let { videoId } = useParams();
  console.log("videodetals is rendered");
  useEffect(() => {
    let filteredArray = videos.filter((video) => video._id === videoId);
    if (filteredArray.length) {
      setVideo(filteredArray[0]);
    }
  }, [videos, videoId]);
  return (
    <>
      <div id="right-side">
        <div id="banner">
          <img
            src={
              videoId
                ? `http://localhost:9000/Thumbnails/${video?.Thumbnail}`
                : `http://localhost:9000/Thumbnails/${videos[0]?.Thumbnail}`
            }
            alt="Thumbnail"
          />
        </div>
        <div className="details">
          <div className="first-row">
            <h3>{videoId ? video?.title : videos[0]?.title}</h3>
            <div id="movie-details">
              <span id="date">{videoId ? video?.date : videos[0]?.date}</span>
              <span id="duration">
                {videoId ? video?.duration : videos[0]?.duration} Mins
              </span>
              <span id="views">
                {videoId ? video?.views : videos[0]?.views} Views
              </span>
            </div>
          </div>
          <div className="second-row">
            <h3>Description</h3>
            <div className="text-box">
              <p>{videoId ? video?.Description : videos[0]?.Description}</p>
            </div>
          </div>
          <div className="third-row">
            <div className="category">
              <h3>Category</h3>
              <select value={videoId ? video?.Category : videos[0]?.Category}>
                <option value="Action">Action</option>
                <option value="Thriller">Thriller</option>
                <option value="Fantacy">Fantacy</option>
                <option value="Comedy">Comedy</option>
              </select>
            </div>
            <div className="visibility">
              <h3>Visibility</h3>
              <select
                value={videoId ? video?.Visibility : videos[0]?.Visibility}
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>
          </div>
          <div className="fourth-row">
            <button id="delete" onClick={() => deleteVideo(videoId)}>
              Delete
            </button>
            <button id="save" onClick={() => navigate("/")}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// const Myvideos = () => {
//     let [myvideos, setMyvideos] = useState([])
//     let params=useParams()
//     let token = useSelector((state) => {
//         return state.Login.token
//     })

//     useEffect(() => {
//         getUsersVideo(token)
//         .then((data)=>{
//             if(data.data){
//                 setMyvideos(data.data)
//             }
//         })
//     }, [])
const Myvideos = () => {
    const [myvideos, setMyvideos] = useState([]);
    const params = useParams();
    let navigate=useNavigate()
    const token = useSelector((state) => {
        return state.Login.token;
    });

    useEffect(() => {
        getUsersVideo(token)
            .then((data) => {
                console.log(data)
                if (data.data.length) {
                    setMyvideos(data.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching videos:", error);
            });
    }, []);
// const Myvideos = () => {
//   const [myvideos, setMyvideos] = useState([]);
//   const params = useParams();
//   const token = useSelector((state) => state.Login.token);

//   useEffect(() => {
//     getUsersVideo(token)
//       .then((data) => {
//         if (data && data.data && data.data.length) {
//           // Check if data.data is defined and not empty
//           setMyvideos(data.data);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching videos:", error);
//       });
//   }, [token]);

  let deleteVideo = (videoId) => {
    
    DeleteUsersVideo(videoId, token)
      .then((res) => {
        if (res.data) {
          let deletedVideo = res.data;
          console.log(deleteVideo);
          let remainingVideos = myvideos.filter(
            (video) => video._id !== deletedVideo._id
          );
          setMyvideos(remainingVideos)
          navigate(`${remainingVideos[0]?._id}`)
          
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <Navbar />
      <section>
        <div id="left-side">
          <div className="top">
            <span>My Videos</span>
            <select>
              <option value="Recent">Recent</option>
              <option value="Most Watched">Most Watched</option>
              <option value="Latest">Latest</option>
            </select>
          </div>
          <div className="bottom">
            {myvideos.map((item) => (
              <Link to={`${item._id}`}>
                <VideoItem key={item._id} item={item} />
              </Link>
            ))}
          </div>
        </div>
        <VideoDetails deleteVideo={deleteVideo} videos={myvideos} />
      </section>
    </div>
  );
};

export default Myvideos;
