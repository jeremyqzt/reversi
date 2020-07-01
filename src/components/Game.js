import React, { Component } from 'react';
import Board from './Board';
import Nav from './Nav';

import '../css/board.css';

class Game extends Component {
    render(){
        return (
            <div>           
                 <Nav />
                <Board />
            </div>
        );
      };
}

export default Game;
