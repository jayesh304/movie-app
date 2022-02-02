import React, { Component } from 'react';
import './Header.css';
import logo from './logo.svg';

class Header extends Component {
    state = {  } 
    render() { 
        return (
            <div className='header'>
                <img src={logo} className="app-logo" alt="logo" />
            </div>
        );
    }
}
 
export default Header;