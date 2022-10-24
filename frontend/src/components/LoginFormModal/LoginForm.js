import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import './LoginForm.css'

function LoginForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [passwordErr, setPasswordErr] = useState('');
    const [credentialErr, setCredentialErr] = useState('');
    const [renderErr, setRenderErr] = useState(false)
    const [placeHolder] = useState('      ');

    //Button to demonstrate User functions throughout site for testing
    const demoUserButton = (e) => {
        //UseState CB functions to set Err's to empty strings and use demo-user from backend
        //seeder file
        setPasswordErr('');
        setCredentialErr('');
        setCredential('stabelish');
        setPassword('CryingFace');
        history.push('/');
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        setRenderErr(true);


        if (credential.length && password.length) {
            return dispatch(sessionActions.login({ credential, password })).catch(
                async (res) => {
                    const data = await res.json();
                    console.log("data.message", data.message)

                    if (data && data.message) setErrors([data.message]);
                }
            );
        }
        history.push('/');
    };

    useEffect(() => {
        if (credential.length < 1) {
            setCredentialErr('Email is required')
        } else {
            setCredentialErr('');
        }
        if (!password.length) {
            setPasswordErr('Password is required')
        } else {
            setPasswordErr('');
        }

        setErrors([]);

    }, [credential, password])
    console.log("errors", errors)
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-main-div">

                <div className="login-err-ul">
                    {errors.map((error) => (
                        <div className="invalid-login-err" key={error}>{error}</div>
                    ))}
                </div>

                <div className="input-main-div">
                    <div className="input-inner-div">
                        <div className="input-header">Email</div>

                        <div className="login-input">
                            <input
                                className="input-field"
                                type="text"
                                value={credential}
                                onChange={(e) => setCredential(e.target.value)}

                            />

                        </div>
                        <div className="input-error">

                            {(renderErr && !credential && credentialErr) || placeHolder}
                        </div>
                    </div>
                </div>


                <div className="input-main-div">
                    <div className="input-inner-div">
                        <div className="input-header">Password</div>

                        <div className="login-input">
                            <input
                                className="input-field"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}

                            />
                        </div>
                        <div className="input-error">
                            {(!!renderErr && passwordErr.length > 0 && passwordErr) || placeHolder}

                        </div>
                    </div>
                </div>

                <div className="login-button-div">
                    <button className='login-button' type="submit">Log In</button>
                </div>
                <div className="login-button-div">
                    <button className='login-button' type="submit" onClick={demoUserButton}>Demo User Log In</button>
                </div>
            </div>
        </form>
    );
}

export default LoginForm;
