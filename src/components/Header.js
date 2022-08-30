import React from 'react';

const Header = ({user}) => {
    console.log(user)
    return (
        <div className='header'>
            <img src="./images/logo.jpg" alt="logo" />
            <p>{user.displayName}</p>
            <i className="fa-solid fa-cart-shopping"></i>
        </div>
    );
};

export default Header;