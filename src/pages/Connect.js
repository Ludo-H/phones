import React, { Fragment, useState } from 'react';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import Login from '../components/Log/Login';
import SignUp from '../components/Log/SignUp';

const Connect = () => {

    // state pour gérer l'affichage login/signup
    /***************************************************************/
    const [loginButton, setLoginButton] = useState(true)
    const [signUpButton, setSignUpButton] = useState(false)
    /***************************************************************/


    // Logique de la modale connexion
    /***************************************************************/
    const handleLogin = () => {
        setLoginButton(true);
        setSignUpButton(false);
    }
    /***************************************************************/


    // Logique de la modale s'inscrire
    /***************************************************************/
    const handleSignUp = () => {
        setSignUpButton(true);
        setLoginButton(false);
    }
    /***************************************************************/

    return (
        <Fragment>
            <Loader />
            <div className='connect__container content'>
                <img 
                    src="./images/logo.jpg" 
                    alt="logo"
                />
                <div className='connect__container__buttons'>
                    <button onClick={() => handleLogin()}>
                        Se connecter
                    </button>
                    <button onClick={() => handleSignUp()}>
                        S'inscrire
                    </button>
                </div>
                <div className='connect__container__modal'>
                    {loginButton && <Login />}
                    {signUpButton && <SignUp />}
                </div>
            </div>
            <Footer/>
        </Fragment>
    );
};

export default Connect;