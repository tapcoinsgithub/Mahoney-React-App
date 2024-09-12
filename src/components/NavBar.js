import { React, useContext } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function NavBar() {
    const [loggedIn, setLoggedin] = useContext(UserContext)
    const navigate = useNavigate();
    const LOGOUT_URL = '/logout'

    const logout = async (e) => {
      e.preventDefault();
      // try{
      //     const response = await axios.post(LOGOUT_URL, 
      //         JSON.stringify({ username, password}),
      //         {
      //             headers: {
      //                 'Content-Type': 'application/json',
      //                 'Access-Control-Allow-Credentials': "true"
      //             },
      //             origin: "http://127.0.0.1:8081/login",
      //             withCredentials: true
      //         }
      //     );
      // }
      // catch(error) {
      //     if (!error?.response){
      //         setErrorMessage("No Server Response.")
      //     }
      //     else{
      //         setErrorMessage("Logout Failed")
      //     }
      //     console.log(error);
      // }
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
