import React, { Component } from 'react';
import JwtUtils from '../utils/jwtUtils.js';

class Nav extends Component {

    constructor(){
        super();
        this.__handleLogout = this.__logout.bind(this);
    }

    __logout(){
        JwtUtils.deleteToken();
        window.location.href = '/';
    }

    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow mb-2" >
                <h6 className="navbar-brand noSelect">Reversi!</h6>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/home">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/rules">Rules</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/">Account</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/about">About</a>
                    </li>
                    </ul>
                    <button className="btn btn-outline-light my-2 my-sm-0" onClick={this.__handleLogout}>Log Off</button>
                </div>
                </nav>
        );
    };
}
export default Nav;