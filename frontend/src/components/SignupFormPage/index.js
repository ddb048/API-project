import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignUpForm.css';

function SignupFormPage() {
    const dispatch = useDispatch();

    /*********************State**************** */
    const sessionUser = useSelector((state) => state.session.user);

    //state
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    //field state errors
    const [emailErr, setEmailErr] = useState('');
    const [usernameErr, setUsernameErr] = usestate('');
    const [passwordErr, setPasswordErr] = useState('');
    const [firstNameErr, setFirstNameErr] = useState('');
    const [lastNameErr, setLastNameErr] = useState('');
    const [confirmPasswordErr, setConfirmPasswordErr] = useState('');
    const [renderErr, setRenderErr] = useState(false);
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;
    /********************Helper Function***************** */

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }
    /********************Use Effect******************* */

    useEffect(() => {

        //email error handling
        if (email.length && !validateEmail(email)) {
            setEmailErr('invalid email')
        } else if (!email.length) {
            setEmailErr('email is required')
        }

        //username error handling
        if (username.length < 4) {
            setUsernameErr('username must be at least 4 characters')
        } else {
            setUsernameErr("")
        }

        //firstName error handling
        if (!firstName.length) {
            setFirstNameErr('first name is required')
        } else {
            setFirstNameErr("");
        }

        //lastName error handling
        if (!lastName.length) {
            setLastNameErr('last name is required')
        } else {
            setLastNameErr('')
        }

        //password error handling
        if (!password.length) {
            setPasswordErr('password is required')
        } else if (password.length && password.length < 6) {
            setPasswordErr('password must be greater than 6 characters')
        } else {
            setPasswordErr("")
        }

        //confirm password error handling
        if (confirmPassword.length && confirmPassword !== password) {
            setConfirmPasswordErr('please confirm passwords match')
        } else {
            setConfirmPasswordErr("");
        }
    }, [username, email, firstName, lastName, password, confirmPassword])

    /***********************On Submit********************* */


    const handleSubmit = (e) => {
        e.preventDefault();
        setRenderErr(true)

        if (
            !usernameErr &&
            !emailErr &&
            !firstNameErr &&
            !lastNameErr &&
            !passwordErr &&
            !confirmPasswordErr
        ) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.message) setErrors(data.message);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div className="main">
            <div className="title">Sign Up!</div>
            <div className="error-div">{errors.map((error, idx) => {
                <div className="error" key={idx}>{error}</div>
            }
            )}</div>
            <form onSubmit={handleSubmit}>
                <div className="input-main">
                    <div className="input">
                        <label>
                            <div className="title">Email</div>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                </div>
                <div className="input-main">
                    <div className="input">
                        <label>
                            <div className="title">Username</div>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                </div>
                <div className="input-main">
                    <div className="input">
                        <label>
                            <div className="title">Password</div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                </div>
                <div className="input-main">
                    <input>
                        <label>
                            <div className="title">Confirm Password</div>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </label>
                    </input>
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignupFormPage;
