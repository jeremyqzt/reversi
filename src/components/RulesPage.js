import React, { Component } from 'react';
import Rules from "./Rules"
import Nav from "./Nav"
import JwtUtils from '../utils/jwtUtils';

class RulesPage extends Component {
    constructor(props){
        super(props)
        JwtUtils.checkTokenPresent();
    }

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