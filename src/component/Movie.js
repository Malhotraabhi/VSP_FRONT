import React from 'react';
import '../Styles/movie.css';
function Movie({item}) {

  // 
  return (
    <div className="movie">
      <div className="banner-container">
        <img src={`http://localhost:9000/Thumbnails/${item?.Thumbnail}`} alt="movie-banner" />
      </div>
      <div className="info">
        <h3>{item?.title}</h3>
        <div className="movie-info">
          <span id="date">{item?.date}</span>
          <span id="duration">{item?.duration} Mins</span>
          <span id="views">{item?.views} Views</span>
        </div>
        <div className='publisher-info'>
          <div id="image-container"><img src={`http://localhost:9000/Pictures/${item?.PublisherProfilePic}`} alt="publisher" /></div>
          <h3>{item?.PublisherName}</h3>
        </div>
      </div>
    </div>
  );
}

export default Movie;
