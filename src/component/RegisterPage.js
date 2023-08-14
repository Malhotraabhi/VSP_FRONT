import React, { useRef, useState } from 'react';
import '../Styles/register.css'
import { Link, useNavigate } from 'react-router-dom';
import { DoRegistration } from '../data-store/api-utils';

const Register = () => {
  let navigate=useNavigate()
  let ProfileRef=useRef();
  let [error,setError]=useState("")
  let [userdata,setUserdata]=useState({
    Name:"",
    Email:"",
    Phone:"",
    Profession:"",
    Password:"",
    ConfirmPassword:"",
    ProfileImage:""
  })

  function Validation({Name,Email,Phone,Profession,Password,ConfirmPassword}){
    let errorDescription=""
      if(Name.trim()==="" || Email.trim()==="" || Phone.trim()==="" || Profession.trim()==="" || Password.trim()==="" || ConfirmPassword.trim()===""){
        console.log(userdata)
          errorDescription="All Fields Must Be Filled"
      }
       if(!/.com/.test(Email) || !/@/.test(Email)){
        errorDescription="Please Provide Valid Email"
      }
       if(Password !== ConfirmPassword){
        errorDescription="Passwords Does Not Match"
      }
      if(Phone.length!=10){
        errorDescription="Invalid Number"
        
      }

      return errorDescription
  }

  function handleRegister(e){
    e.preventDefault();
    let error=Validation(userdata)
    if(!error){
        let formdata=new FormData();
        formdata.append("Name",userdata.Name)
        formdata.append("Email",userdata.Email)
        formdata.append("Phone",userdata.Phone)
        formdata.append("Profession",userdata.Profession)
        formdata.append("Password",userdata.Password)
        formdata.append("profile",ProfileRef.current.files[0])
        DoRegistration(formdata)
        .then((res)=>{
          if(res.status==200){
            navigate('/login')
          }
        }).catch((err)=>{
          setError(err.message)
        })
    }else{
      setError(error)
    }
  }

  function handleProfilePhoto(e){
    ProfileRef.current.click()
  }

  function handlePhoto(){
    let photo=ProfileRef.current.files[0]
    if(photo){
      setUserdata({...userdata,ProfileImage:photo.name})
    }
  }
  return (
    <div className="register-page">
      <div className="left-box">
        <div className='tuner-box'>
          <h1>MeTube</h1>
          <p>Enjoy Multiple videos at one place</p>
        </div>
        <Link id="an" to="/login">Log In</Link>
      </div>
      <div className="right-box">
        <h2 id="ri">Register</h2>
        <p id="rig">Register to continue accessing pages</p>
        {error && <div id='error-box'>{error}</div>}
        <form action="" onSubmit={handleRegister}>
          <div className="circle" onClick={handleProfilePhoto}>
            <input ref={ProfileRef} type="file" onChange={handlePhoto}/>
            <span>Picture</span>
            </div>
            {userdata.ProfileImage && <div id='file-name'>{userdata.ProfileImage}</div>}
          <input type="text" placeholder="Name" onChange={(e)=>setUserdata({...userdata,Name:e.target.value})}/>
          <input type="email" placeholder="Email" onChange={(e)=>setUserdata({...userdata,Email:e.target.value})}/>
          <input type="number" placeholder="Phone" onChange={(e)=>setUserdata({...userdata,Phone:e.target.value})}/>
          <input type="text" placeholder="Profession" onChange={(e)=>setUserdata({...userdata,Profession:e.target.value})}/>
          <input type="password" placeholder="Password" onChange={(e)=>setUserdata({...userdata,Password:e.target.value})}/>
          <input type="password" placeholder="Confirm Password" onChange={(e)=>setUserdata({...userdata,ConfirmPassword:e.target.value})}/>
          <div>

          <button type='submit'>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

