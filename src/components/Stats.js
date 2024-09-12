import { React, useContext, useEffect } from 'react'
import { UserContext } from "../App";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Stats() {
    const [loggedIn, setLoggedin] = useContext(UserContext)
    const [token, setToken] = useContext(UserContext)
    const navigate = useNavigate();
    useEffect(() => {
        if (!loggedIn){
            navigate('/logReg')
        }
    }, [])
  return (
    <div>
      <h1 style={{color: 'black'}}>Stats Page</h1>
    </div>
  )
}

export default Stats
