import { React, useContext } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function NavBar() {
    const [loggedIn, setLoggedin] = useContext(UserContext)
    const navigate = useNavigate();

    const logout = () => {
        console.log("PRESSING LOGOUT")
        setLoggedin(false);
        navigate("/logReg")
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
