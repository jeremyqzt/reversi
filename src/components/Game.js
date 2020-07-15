import React, { Component } from 'react';
import Board from './Board';
import Nav from './Nav';
import Stats from './Stats';
import JwtUtils from '../utils/jwtUtils.js';
import reversiLogic from '../reversiLogic/reversi';

import '../css/board.css';
import { pieceVal } from './Piece';

class Game extends Component {
    constructor(props){
        super(props);
        this.handleMoveAction = this.handleMoveAction.bind(this);
        this.handleTurn = this.handleTurn.bind(this);
        this.handleCount = this.handleCount.bind(this);
        this.handleOpp = this.handleOpp.bind(this);

        this.reversiGame = {
            reversi: new reversiLogic(),
            moveAct: this.handleMoveAction,
        }

        this.statsMan = {
            turn: this.handleTurn,
            count: this.handleCount,
            opp: this.handleOpp,
        }

        this.aiDiff = 0;
        if (this.props.location.search.length > 0){
            this.aiDiff = parseInt(this.props.location.search.substr(-1));
            this.aiDiff =  (isNaN(this.aiDiff) || this.aiDiff > 3) ? 1 : this.aiDiff;
        }
        //JwtUtils.checkTokenPresent();
    }

    handleMoveAction = () =>{
        let turn = this.reversiGame.reversi.getTurn();
        let pieceCount = this.reversiGame.reversi.getPieceCount();
        this.setTurn(turn === pieceVal.BLACK);
        this.setCount(pieceCount);
    }

    handleTurn = (func) =>{
        this.setTurn = func;
    }

    handleCount = (func) =>{
        this.setCount = func;
    }

    handleOpp = (func) =>{
        this.setOpp = func;
    }

    render(){
        return (
            <div>           
                <Nav />
                <div className="container mt-4 mb-4">
                    <h1 className="text-center noSelect"><span role="img" aria-label="blackCircle">⚫</span>Reversi Game Room<span role="img" aria-label="whiteCircle">⚪</span></h1>
                </div>
                <div className="container">
                    <div className = "row">
                        <Board gameDetails={this.reversiGame}/>
                        <Stats updateDetails={this.statsMan}/>
                    </div>
                </div>
            </div>
        );
      };
}

export default Game;
