import React, { Component } from 'react';
import Rules from "./Rules"
import Nav from "./Nav"

class RulesPage extends Component {
    render(){
      return (
        <div>
            <Nav />
            <div className="container mt-4 mb-4">
                <h1 className="text-center noSelect">Reversi Game Rules</h1>
            </div>
            <div className="container">
                <Rules />
            </div>
        </div>
      );
    };
  }

export default RulesPage;