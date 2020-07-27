import React, { Component } from 'react';
import '../css/board.css';
import '../css/landing.css';

class LandingPage extends Component {
    render(){
      return (
        <div className="reversiColors">
            <div className="d-flex fullScreen">
                <div className="justify-content-center center text-center">
                    <h1 className="noSelect reversiHeader big">Online Reversi</h1>
                    <a href="/login" role="button" className="btn btn-primary" style={{color: "lavender", backgroundColor: "#505160", borderColor: "lavender"}}>Play Now!</a>
                </div>
            </div>
        </div>
      );
    };
  }

export default LandingPage