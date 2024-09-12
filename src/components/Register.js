import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import { UserContext } from "..";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register"

const Register = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [validUserName, setValidUserName] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(username);
        setValidUserName(result)
    }, [username]);

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPassword(result)
        const match = password === confirmPassword;
        setValidConfirmPassword(match)
    }, [password, confirmPassword]);

    useEffect(() => {
        setErrorMessage('');
    }, [username, password, confirmPassword]);

    const handleRegister = async (e) => {
        e.preventDefault();
        const confirmUsername = USER_REGEX.test(username);
        const confirmPassword = PWD_REGEX.test(password);
        if (!confirmUsername || !confirmPassword){
            setErrorMessage("Invalid Entry.");
            return;
        }
        try{
            const response = await axios.post(REGISTER_URL, 
                JSON.stringify({ username, password}),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Credentials': "true"
                    },
                    origin: "http://127.0.0.1:8081/register",
                    withCredentials: true
                }
            );
            console.log(response.data);
            if (response.data.result == "Success"){
                console.log("RESULT IS TRUE")
                setSuccess(true)
            }
            else{
                console.log("RESULT IS FALSE")
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
        }
    }
    return (
        <section className="registrationContainer">
            <p ref={errRef} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errorMessage}</p>
            <h1>Register</h1>
            <form className="registrationForm" onSubmit={handleRegister}>
                <label htmlFor="username">
                    Username:
                    <span className={validUserName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validUserName || !username ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    aria-invalid={validUserName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUsernameFocus(true)}
                    onBlur={() => setUsernameFocus(false)}
                />
                <p id="uidnote" className={usernameFocus && username && !validUserName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters. <br />
                    Must begin with a letter.<br />
                    Letters, numbers userscores, hyphens allowed.
                </p>

                <label htmlFor="password">
                    Password:
                    <span className={validPassword ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPassword || !password ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-invalid={validPassword ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                />
                <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters. <br />
                    Must include uppercase and lowercase letters, a number and as special chartacter.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span><span aria-label="at symbol">@</span><span aria-label="hashtag">#</span><span aria-label="dollar sign">$</span><span aria-label="percent">%</span>
                    
                </p>

                <label htmlFor="confirmPassword">
                    Confirm Password:
                    <span className={validConfirmPassword && confirmPassword ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validConfirmPassword || !confirmPassword ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    aria-invalid={validConfirmPassword ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setConfirmPasswordFocus(true)}
                    onBlur={() => setConfirmPasswordFocus(false)}
                />
                <p id="confirmnote" className={confirmPasswordFocus && !validConfirmPassword ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the above password.
                </p>
                <button type="submit" disabled={!validUserName || !validPassword || !validConfirmPassword ? true : false}>Register</button>
            </form>
            <p className={success ? "success" : "offscreen"} > Successfully Registered User!</p>
        </section>
    )
}

export default Register