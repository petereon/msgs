import React from 'react';
import './main-pane.scss';
// import Editor from '../editor/editor';
import Navbar from '../navbar/navbar';
import Editor from '../editor/editor';

const MainPane: React.FC = () => {
    return (
        <div className='main-pane'>
            <Navbar />
            <Editor />
        </div>
    );
};

export default MainPane;
