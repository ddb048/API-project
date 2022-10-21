import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import * as sessionActions from '../../store/session';
import upload from "../../img/upload.png";
import downArrow from '../../img/down-arrow.png';
import profile from '../../img/profile.png';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };
    //removed your groups and events ADD BACK LATER
    return (
        <>

            <Link className="create-group" to="/groups/new">Create a Group</Link>
            <div className="profile-button" onClick={openMenu}>
                <div className="profile-menu">
                    <img className="profile-pic" src={profile} />
                    <img className="profile-menu-button" src={showMenu ? upload : downArrow} />
                </div>

            </div>

            <div className="profile-dropdown" id={showMenu ? 'open' : 'closed'}>
                <div className="user-email">{user.email}</div>

                <div onClick={logout}>Log out</div>
            </div>
        </>
    );
}

export default ProfileButton;
