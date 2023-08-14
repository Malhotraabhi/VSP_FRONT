import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import LoginPage from '../component/LoginPage';
import Register from '../component/RegisterPage';
import Myvideos, { VideoDetails } from '../pages/Myvideos';
import VideoPlay from '../pages/VideoPlay';
function RouteConfig() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/Myvideos' element={<Myvideos />}>
            <Route path=":videoId" element={<VideoDetails />} />
          </Route>
          <Route path='/playvideos/:videoId' element={<VideoPlay />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default RouteConfig
