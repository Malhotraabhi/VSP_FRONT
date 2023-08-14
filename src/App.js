import React from 'react';
import './App.css';
import RouteConfig from './Layout/RouteConfig';
import { Provider } from 'react-redux';
import { store } from './data-store/Store';
// import UploadVideo from './component/UploadVideo';

// import Navbar from './component/Navbar';

// import Home from './pages/Home';
// import VideoItem from './component/VideoItem';
// import LoginPage from './component/LoginPage';
// import RegisterPage from './component/RegisterPage';


// import Navbar from './component/Navbar';
// import UploadVideo from './component/UploadVideo';
import Home from './pages/Home';
// import Myvideos from './pages/Myvideos';
// import VideoItem from './component/VideoItem';
// import VideoPlay from './pages/VideoPlay';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        {/* <Home/> */}
      <RouteConfig/>
      {/* <UploadVideo/> */}
      </Provider>
    </div>
  );
}

export default App;
