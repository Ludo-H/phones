import React, { Fragment, useEffect, useState } from 'react';
import Header from '../components/Header';
import { auth } from '../utils/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';

const Commandes = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(currentUser);
        });
    }, [user])

    return (
        <Fragment>
            {user ?
                <div>
                    <Header user={user} />
                    Commandes
                </div>
                :
                <p>Connectez vous pour accéder au site, mettre comp loading </p>
            }
        </Fragment>
    );
};

export default Commandes;