import React, { Component } from 'react';
import '../css/landing.css';
import '../css/board.css';

class LandingPage extends Component {
    render(){
      return (
        <div className="reversiColors">
            <div className="d-flex fullScreen">
                <div className="justify-content-center center text-center">
                    <h1 className="noSelect reversiHeader big">Reversi</h1>
                    <a href="/login" role="button" className="btn btn-dark">Get Started!</a>
                </div>
            </div>
        </div>
      );
    };
  }

export default LandingPage