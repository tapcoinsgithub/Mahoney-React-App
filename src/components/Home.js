import { React, useContext, useEffect, useState } from 'react'
import { UserContext } from "../App";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";

function Home() {
  const [loggedIn, setLoggedIn] = useContext(UserContext)
  const [token, setToken] = useContext(UserContext)
    const navigate = useNavigate();
    const GETUSER_URL = "/user"
  
    const getUser = async () => {
      if (token == ''){
        setLoggedIn(false);
        navigate('/logReg');
        return
      }
      try{
        const response = await axios.get(GETUSER_URL, 
          {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': "true",
                'Authorization': `Bearer ${token}`
            },
            origin: "http://127.0.0.1:8081/user",
            withCredentials: true
          }
        );
        if (response.data.result == "Valid"){
            setLoggedIn(true);
            setToken(token);
            navigate('/home');
        }
        else{
          setLoggedIn(false);
          setToken('');
          navigate('/logReg')
        }
      }
      catch(error) {
        setLoggedIn(false);
        navigate('/logReg')
      }
    }
  
    useEffect(() => {
      getUser()
    }, [])
    // useEffect(() => {
    //     if (!loggedIn){
    //         navigate('/logReg')
    //     }
    // }, [])
  return (
    <div>
      <h1 style={{color: 'black'}}>Home Page</h1>
    </div>
  )
}

export default Home
