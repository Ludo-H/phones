import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase.config';

const Header = ({ user }) => {

    const [displayNav, setDisplayNav] = useState(false)

    const handleLogout = async () => {
        await signOut(auth);
        window.location = '/';
    }

    return (
        <div className='header'>
            <NavLink to='/home'>
                <img src="./images/logo.jpg" alt="logo" />
            </NavLink>
            <div className='header__nav'>
                <p onClick={() => setDisplayNav(!displayNav)}>
                    {user.displayName}
                </p>
                {displayNav &&
                    <ul>
                        <NavLink to='/profil'>
                            <li>Profil</li>
                        </NavLink>
                        <NavLink to='/commandes'>
                            <li>Commandes</li>
                        </NavLink>
                        <li onClick={() => handleLogout()}>Se déconnecter</li>
                    </ul>
                }
            </div>
            <NavLink to='/cart'>
                <i className="fa-solid fa-cart-shopping"></i>
            </NavLink>
        </div>
    );
};

export default Header;