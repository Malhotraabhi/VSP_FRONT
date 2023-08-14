import React, { useRef, useState } from 'react'
import '../Styles/uploadVideo.css'
import { useSelector } from 'react-redux'
import { UploadVideoinDB } from '../data-store/api-utils'
import { Link, useNavigate } from 'react-router-dom'
const UploadVideo = ({ offUpload }) => {
    let navigate=useNavigate()
    let token = useSelector((state) => {
        return state.Login.token
    })
    const videoRef = useRef();
    const ThumbnailRef = useRef()
    let [videodata, setVideodata] = useState({
        title: "",
        Description: "",
        Category: "",
        Visibility: "",
        Video: "",

    })
    const handleVideo = (e) => {
        videoRef.current.click();
    };

    const handleFileChange = (event) => {
        const selectedFile = videoRef.current.files[0];
        if (selectedFile) {
            setVideodata({ ...videodata, Video: selectedFile.name })
        }
        // event.preventDefault();
    };


    function UploadVideo(e) {
        e.preventDefault()
        let formdata = new FormData()
        formdata.append("title", videodata.title)
        formdata.append("Description", videodata.Description)
        formdata.append("Category", videodata.Category)
        formdata.append("Visibility", videodata.Visibility)
        formdata.append("video", videoRef.current.files[0])
        formdata.append("thumbnail", ThumbnailRef.current.files[0])
        UploadVideoinDB(formdata,token).then((res) => {
            setVideodata({
                title: "",
                Description: "",
                Category: "",
                Visibility: "",
                Video: "",
            })
            offUpload()
            navigate('/')

        }).catch((err)=>{
            console.log(err.message)
        })

    }




    return (
        <div className='body'>
            <div id="upload-box">
                <form action="" onSubmit={UploadVideo}>
                    <div className="top-section">
                        <span>Upload New Video</span>
                        <svg xmlns="http://www.w3.org/2000/svg" color='white' width="30" height="30" fillRule="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </div>
                    <div className="video-upload-section">
                        <div className="block" onClick={handleVideo}>
                            <input type="file" ref={videoRef} onChange={handleFileChange} />
                            <input type="text" value={videodata.Video} onChange={(e) => setVideodata({ ...videodata, Video: e.target.value })} />
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fillRule="currentColor" className="bi bi-cloud-arrow-up" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z" />
                                <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                            </svg>
                            <h3>Drag and drop to upload</h3>
                            <p>or browse to choose a file</p>
                        </div>
                    </div>
                    <div className="name-section">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name='title' value={videodata.title} onChange={(e) => setVideodata({ ...videodata, title: e.target.value })} />
                    </div>
                    <div className="description-section">
                        <label htmlFor="description">Description</label>
                        <textarea name="Description" id="description" value={videodata.Description} onChange={(e) => setVideodata({ ...videodata, Description: e.target.value })} ></textarea>
                    </div>
                    <div className="category-section">
                        <div className="category">
                            <h3>Category</h3>
                            <select value={videodata.Category} onChange={(e) => setVideodata({ ...videodata, Category: e.target.value })}>
                                <option value="Action">Action</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Sci-fi">Sci-fi</option>
                                <option value="Comedy">Comedy</option>
                            </select>
                        </div>
                        <div className="visibility">
                            <h3>Visibility</h3>
                            <select value={videodata.Visibility} onChange={(e) => setVideodata({ ...videodata, Visibility: e.target.value })}>
                                <option value="Public">Public</option>
                                <option value="Private">Private</option>
                            </select>
                        </div>
                        <div className="upload-banner">
                            <label htmlFor="banner">Video Thumbnail</label>
                            <input ref={ThumbnailRef} type="file" id='banner' />
                        </div>
                    </div>
                    <div className="upload-footer">
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UploadVideo
