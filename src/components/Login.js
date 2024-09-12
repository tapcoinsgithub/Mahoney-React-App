import { useRef, useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const LOGIN_URL = '/login'

const Login = () => {
    const [loggedIn, setLoggedin] = useContext(UserContext)
    const [token, setToken] = useContext(UserContext)
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMessage('');
    }, [username, password]);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username.length < 0){
            setErrorMessage("Invalid Username.");
            setHasError(true);
            return;
        }
        if (password.length < 8 || password.length > 24){
            setErrorMessage("Invalid Password.");
            setHasError(true);
            return;
        }
        try{
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({ username, password}),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Credentials': "true"
                    },
                    origin: "http://127.0.0.1:8081/login",
                    withCredentials: true
                }
            );
            if (response.data.result == "Success"){
                setUsername('');
                setPassword('');
                setLoggedin(true);
                setToken(response.data.token)
                navigate('/home');
            }
            else{
                console.log("FAILED")
            }
        }
        catch(error) {
            if (!error?.response){
                setErrorMessage("No Server Response.")
            }
            else{
                setErrorMessage("Registration Failed")
            }
            console.log(error);
            errRef.current.focus()
        }
    }
    return (
        <section>
            <p ref={errRef} className={hasError ? "errmsg" : "offscreen"} aria-live="assertive">{errorMessage}</p>
            <h1>Login</h1>
            <form className="loginForm" onSubmit={handleLogin}>
                <label htmlFor="username">
                    Username:
                </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                    aria-label="Username input"
                />

                <label htmlFor="password">
                    Password:
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    aria-label="Password input"
                />
                <button disabled={!username || !password ? true : false}>Login</button>
            </form>
        </section>
    )
}

export default Login