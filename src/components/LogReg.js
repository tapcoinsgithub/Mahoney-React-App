import { React, useContext, useEffect } from 'react'
import Login from './Login';
import Register from './Register';
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

function LogReg() {
  const [loggedIn, setLoggedin] = useContext(UserContext)
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) {
        navigate('/home')
    }
}, []);
  return (
    <div className='logRegContainer'>
      <Login />
      <Register />
    </div>
  )
}

export default LogReg
