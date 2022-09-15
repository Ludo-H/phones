import React, { Fragment, useEffect, useState } from 'react';
import Header from '../components/Header';
import { auth } from '../utils/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import Footer from '../components/Footer';

const Commandes = () => {

    // State pour avoir infos user
    /***************************************************************/
    const [user, setUser] = useState(null);
    /***************************************************************/


    // Logique pour savoir si user connecté
    /***************************************************************/
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(currentUser);
        });
    }, [user])
    /***************************************************************/

    return (
        <Fragment>
            {user ?
            <Fragment>
            <Header user={user} />
                <div className='content'>
                    Commandes
                </div>
            </Fragment>
                :
                <p className='content connectMsg'>Connectez vous pour accéder au site</p>
            }
            <Footer/>
        </Fragment>
    );
};

export default Commandes;