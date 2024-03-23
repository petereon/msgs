import React from 'react';
import './sidebar.scss';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__head">
                <div className='sidebar__head__button' id='hook-button'>
                    H
                </div>
                <div className='sidebar__head__button' id='bots-button'>
                    B
                </div>
                <div className='sidebar__head__button' id='runners-button'>
                    R
                </div>
            </div>
            <div className="sidebar__drop">
            </div>
        </div>
    );
};

export default Sidebar;
