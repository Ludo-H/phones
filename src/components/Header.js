import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase.config';
import { useSelector } from 'react-redux';

const Header = ({ user }) => {

    // State pour l'affichage des onglets
    /***************************************************************/
    const [displayNav, setDisplayNav] = useState(false)
    /***************************************************************/


    // Récuperer le contenu du panier pour afficher pastille rouge ou non
    /***************************************************************/
    const basketContent = useSelector((state)=>state.basketReducer)
    /***************************************************************/


    // Logique de déconnexion
    /***************************************************************/
    const handleLogout = async () => {
        await signOut(auth);
        window.location = '/';
    }
    /***************************************************************/

    return (
        <div className='header'>
            <NavLink to='/home'>
                <img 
                    src="../images/logo.jpg" 
                    alt="logo" 
                />
            </NavLink>
            <div className='header__nav'>
                <p onClick={() => setDisplayNav(!displayNav)}>
                    {user.displayName}
                </p>
                {displayNav &&
                    <ul>
                        <NavLink to='/commandes'>
                            <li>Commandes</li>
                        </NavLink>
                        <li onClick={() => handleLogout()}>Se déconnecter</li>
                    </ul>
                }
            </div>
            <NavLink to='/cart'>
                <i className="fa-solid fa-cart-shopping"></i>
                {basketContent.length > 0 ? <div className='basketContent'></div> : ""}
            </NavLink>
        </div>
    );
};

export default Header;