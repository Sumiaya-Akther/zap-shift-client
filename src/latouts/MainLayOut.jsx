import React from 'react';
import Navbar from '../shared/header/Navbar';
import { Outlet } from 'react-router';
import Footer from '../shared/footer/Footer';

const MainLayOut = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayOut;