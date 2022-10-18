import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import BeatUpLogo from '../../img/Beat-Up-Logo.png'
import "./LoginForm.css";

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className='log-in-button' onClick={() => setShowModal(true)}>Log In</div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className='login-modal-main-div'>
                        <div className='login-lvl2-top-div'>
                            <div className='login-lvl3-top-logo'>
                                <img className='login-modal-logo' src={BeatUpLogo} />
                            </div>
                            <div className='login-lvl3-middle-LOGIN'>
                                Log In
                            </div>
                        </div>
                        <LoginForm />
                    </div>
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
