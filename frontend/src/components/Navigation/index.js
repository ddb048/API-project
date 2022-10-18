import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import beatupSmall from '../../img/beatup-small-logo.png';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <div className='nav-button'>
                <LoginFormModal />
                <NavLink className="nav-text" to="/signup">Sign Up</NavLink>
            </div>
        );
    }

    return (
        <div className='nav-bar'>
            <div className='nav-bar-left'>
                <NavLink exact to="/">
                    <img className='beatup-small-logo' src={beatupSmall} />
                </NavLink>
            </div>
            <div className='nav-bar-right'>
                {isLoaded && sessionLinks}
            </div>
        </div>
    );
}

export default Navigation;
