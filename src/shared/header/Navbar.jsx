import React from 'react';
import { Link, NavLink } from 'react-router';
import ProFastLogo from '../proFasrLogo/ProFastLogo';
import useAuth from '../../hooks/useAuth';


const Navbar = () => {
    const { user, logOut } = useAuth();
    const navItems = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About Us</NavLink></li>
        <li><NavLink to="/coverage">Coverage</NavLink></li>
        <li><NavLink to="/sendParcel">Send Parcel</NavLink></li>
        <li><NavLink to="/beARider">Be a Rider</NavLink></li>
        {
            user && <>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            </>
        }
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navItems}
                    </ul>
                </div>
                <div className="btn btn-ghost text-xl">
                    <ProFastLogo></ProFastLogo>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? (
                        <button onClick={logOut} className='btn-primary btn'>Logout</button>
                    ) : (
                        <div className='flex gap-3 items-center'>
                            <Link to="login"><button className='btn-primary btn'>Login</button></Link>
                            <Link to="register"><button className='btn-primary btn'>register</button></Link>
                        </div>

                    )
                }

            </div>
        </div>
    );
};

export default Navbar;