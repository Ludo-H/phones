import React, { Fragment, useRef, useState } from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../../utils/firebase.config';

const Login = () => {

    // State message erreur
    /***************************************************************/
    const [error, setError] = useState(false);
    /***************************************************************/


    // Selections des inputs avec useRef
    /***************************************************************/
    const loginEmail = useRef();
    const loginPassword = useRef();
    /***************************************************************/


    // Logique de connexion
    /***************************************************************/
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, loginEmail.current.value, loginPassword.current.value);
                    
            // on envoie sur la page home
            window.location = '/home';
             
        } catch (error) {
            console.log(error);
            setError(true);
        }
    }
    /***************************************************************/

    return (
        <Fragment>
            <form onSubmit={(e) => handleLogin(e)} className='form'>
                <input
                    type="email"
                    placeholder='Email'
                    ref={loginEmail}
                    required
                />
                <input
                    type="password"
                    placeholder='Mot de passe'
                    ref={loginPassword}
                    required
                />
                <input type="submit" value='Se connecter' />
                <span>{error && "Email ou mot de passe incorrect(s)"}</span>
            </form>
        </Fragment>
    );
};

export default Login;