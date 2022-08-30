import React, { Fragment, useRef, useState } from 'react';
import { auth } from '../../utils/firebase.config'

const SignUp = () => {

    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState(false)

    const registerEmail = useRef();
    const registerPassword = useRef();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            auth.createUserWithEmailAndPassword(registerEmail.current.value, registerPassword.current.value)
                .then(async (userAuth) => {
                    await userAuth.user.updateProfile({
                        displayName: displayName
                    })
                    // on refraichi pour avoir le pseudo à la connexion (sinon displayname reste null dans firebase)
                    window.location.reload()
                })
                .catch((error)=>{
                    console.log(error);
                    setError(true);
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Fragment>
            <form onSubmit={(e) => handleRegister(e)} className='form'>
                <input
                    type="text"
                    placeholder='Pseudo'
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder='Email'
                    ref={registerEmail}
                    required
                />
                <input
                    type="password"
                    placeholder='Mot de passe'
                    ref={registerPassword}
                    required
                />
                <input type="submit" value='Valider inscription' />
                <span>{error && "Email déjà utilisé"}</span>
            </form>
        </Fragment>
    );
};

export default SignUp;