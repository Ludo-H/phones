import React from 'react';
import {BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Connect from '../pages/Connect';
import Cart from '../pages/Cart';
import Error from '../pages/Error';
import Home from '../pages/Home';
import Product from '../pages/Product';
import Profil from '../pages/Profil';
import Commandes from '../pages/Commandes';

const Index = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Connect/>} />
                <Route exact path='/profil' element={<Profil/>} />
                <Route exact path='/home' element={<Home/>} />
                <Route exact path='/cart' element={<Cart/>} />
                <Route exact path='/commandes' element={<Commandes/>} />
                <Route exact path='/product' element={<Product/>} />
                <Route path='*' element={<Error/>} />
            </Routes>
        </Router>
    );
};

export default Index;