import React, { useState } from 'react';
import '../Styles/login.css'
import { Link, useNavigate } from 'react-router-dom';
import { setLogin } from '../data-store/features/LoginSlice';
import { useDispatch } from 'react-redux';
import { DoLogin } from '../data-store/api-utils';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError]=useState("")
  let dispatch=useDispatch()
  let navigate=useNavigate()

  function Validation(email,password){
    let errorDescription=""
    if(!email.trim() && !password.trim()){
      errorDescription="Give the Correct Credentials"
    }else if(!password.trim()){
      errorDescription="Give the Correct Password"
    }else if(!email.trim()){
      errorDescription="Give the Correct Email"
    }

    return errorDescription
  }



  function handleLogin(e) {
    e.preventDefault()
    let Error=Validation(email,password)
    if(!Error){

      DoLogin({Email:email,Password:password})
      .then((res)=>{
        if(res.token){
          dispatch(setLogin(res.token))
          navigate('/')
        }else{
            setError(res.message)
        }
      }).catch((err)=>{
        setError(err.message)
      })
    }else{
      setError(Error)
    }
  };

  return (
    <div className="login-page">
      <div className="left-box">
        <div className="tuner-box">
          <h1>Tuner</h1>
          <p>Enjoy Multiple videos at one place</p>
        </div>
          <Link id="an" to="/register">Register</Link>
      </div>
      <div className="right-box">
        {error && <div id='error-box'>{error}</div>}
        <div className="signin-box">
          <h2 className='sign'>Log In</h2>
          <p className='si'>Log In to continue to access pages</p>
          <form action='' onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit'>Log In</button>
            </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
