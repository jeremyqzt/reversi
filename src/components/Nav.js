import React, { Component } from 'react';

class Nav extends Component {
  render(){
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow mb-2" >
            <h6 className="navbar-brand">Reversi!</h6>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">Game</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">Account</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">About</a>
                </li>
                </ul>
                <button className="btn btn-outline-light my-2 my-sm-0">Log Off</button>
            </div>
            </nav>
    );
  };
}
export default Nav;