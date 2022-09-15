import React, { Fragment } from 'react';
import Footer from '../components/Footer';

// Page pour les chemins url introuvables
const Error = () => {
    return (
        <Fragment>
            <div className='content connectMsg'>
                Page introuvable
            </div>
            <Footer />
        </Fragment>
    );
};

export default Error;