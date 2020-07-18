import React, { Component } from 'react';
import Rules from "./Rules"
import Nav from "./Nav"

class RulesPage extends Component {
    render(){
      return (
        <div>
            <Nav />
            <div className="container">
                <Rules />
            </div>
        </div>
      );
    };
  }

export default RulesPage;