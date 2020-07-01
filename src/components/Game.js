import React, { Component } from 'react';
import Board from './Board';
import Nav from './Nav';
import Stats from './Stats';

import '../css/board.css';

class Game extends Component {
    render(){
        return (
            <div>           
                <Nav />
                <div className="container mt-4 mb-4">
                    <h1 className="text-center noSelect"><span role="img" aria-label="blackCircle">⚫</span>Reversi Game Lobby<span role="img" aria-label="whiteCircle">⚪</span></h1>
                </div>
                <div className="container">
                    <div className = "row">
                        <Board />
                        <Stats />
                    </div>
                </div>
            </div>
        );
      };
}

export default Game;
