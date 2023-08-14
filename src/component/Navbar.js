import React from 'react';
import '../Styles/navbar.css';
import { Link } from 'react-router-dom';
import {  useDispatch, useSelector } from "react-redux"
import { setLogOut } from '../data-store/features/LoginSlice';
import { changeQuery } from '../data-store/features/SearchQuerySlice';
function Navbar({onUpload}) {
  let dispatch=useDispatch()
  let token=useSelector((state)=>{
      return state.Login.token
  })
  // let isToken=sessionStorage.getItem("token")
  
  return (
    <div id='navbar-container'>
      <div id="logo">
        <Link to='/'><h3>Tuner</h3></Link> 
      </div>
      <div id="search">
        <input type="text" placeholder='search' onChange={(e)=>dispatch(changeQuery(e.target.value))}/>
      </div>
      <div id="actions">
        {token?<><Link to='/Myvideos'><span>MyVideos |</span></Link>
       <span onClick={onUpload}> Upload |</span>
       <Link to="/"><span onClick={()=>{dispatch(setLogOut())}}> Logout</span></Link>
       </>
       :
       <><Link to='/login'><span>Login |</span></Link>
       <Link to="/register"><span> Register</span></Link></> }
      </div>
    </div>
  );
}

export default Navbar;
