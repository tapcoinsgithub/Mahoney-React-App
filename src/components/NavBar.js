import { React, useContext } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import axios from "../api/axios";

function NavBar() {
    const [loggedIn, setLoggedin] = useContext(UserContext)
    const [token, setToken] = useContext(UserContext)
    const navigate = useNavigate();
    const LOGOUT_URL = '/logout'

    const logout = async (e) => {
      e.preventDefault();
      try{
        const response = await axios.delete(LOGOUT_URL,
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': "true"
            },
            origin: "http://127.0.0.1:8081/login",
            withCredentials: true
          }
        );
        if (response.status === 204){
          console.log("SUCCESSFULLY Logged out.")
        }
        else{
          console.log("Unable to successfully logout.")
        }
        setLoggedin(false);
        setToken('');
        navigate("/logReg")
      }
      catch(error) {
          console.log(error);
      }
      
    }
  return (
    <nav className="nav">
      <a href="/" className="site-title">Site Name</a>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/create">Create</Link></li>
        <li><Link to="/view">View</Link></li>
        <li><Link to="/stats">Stats</Link></li>
        <button type='button' onClick={logout}>Logout</button>
      </ul>
    </nav>
  )
}

export default NavBar
