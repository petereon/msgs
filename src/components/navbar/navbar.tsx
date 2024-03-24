import React from 'react';
import './navbar.scss';

const Navbar: React.FC = () => {
    return (
        <div className='navbar'>
            <div className="navbar__left">
                <div className='navbar__left__button' id='hook-button'>
                    H
                </div>
                <div className='navbar__left__button' id='bots-button'>
                    B
                </div>
                <div className='navbar__left__button' id='runners-button'>
                    R
                </div>
            </div>
            {/* Navbar content */}
        </div>
    );
};

export default Navbar;
