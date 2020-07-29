import React, { Component } from 'react';
import Board from './Board';
import Nav from './Nav';
import Stats from './Stats';
import reversiLogic from '../reversiLogic/reversi';
import JwtUtils from '../utils/jwtUtils';
import '../css/board.css';
import '../css/firework.css';

import { pieceVal } from './Piece';

class Game extends Component {
    constructor(props){
        super(props);
        JwtUtils.checkTokenPresent();
        this.handleMoveAction = this.handleMoveAction.bind(this);
        this.handleTurn = this.handleTurn.bind(this);
        this.handleCount = this.handleCount.bind(this);
        this.handleOpp = this.handleOpp.bind(this);
        this.lastMove = this.lastMove.bind(this);
        this.setWinner = this.setWinner.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.endTimer = this.endTimer.bind(this);
        this.setTimer = this.setTimer.bind(this);
        this.handleMoveStart = this.handleMoveStart.bind(this);
        this.incrementRegister = this.incrementRegister.bind(this);

        this.aiDiff = 0;
        this.state = {
            gameOver: false,
            boardVisible: false,
        };

        if (this.props.location.search.length > 0){
            this.aiDiff = parseInt(this.props.location.search.substr(-1));
            this.aiDiff =  (isNaN(this.aiDiff) || this.aiDiff > 5) ? 1 : this.aiDiff;
        }

        this.reversiGame = {
            reversi: new reversiLogic(),
            moveAct: this.handleMoveAction,
            moveStartAct: this.handleMoveStart,
            setTime: this.setTimer,
            moveEndAct: this.handleMoveEnd,
            aiDiff: this.aiDiff,
        };

        this.statsMan = {
            turn: this.handleTurn,
            count: this.handleCount,
            opp: this.handleOpp,
            lastMove: this.lastMove,
            winner: this.setWinner,
            startTime: this.startTimer,
            endTime: this.endTimer,
            setTime: this.setTimer,
        };

        this.statsRegisterCount = 0;

        JwtUtils.checkTokenPresent();
    }

    getOppStr = (diff) => {
        switch (diff){
            case 0:
                return "🎎 Playing Against a Local Friend"
            case 1:
                return "🍂 The T-800"
            case 2:
                return "🌱 The T-1000"
            case 3:
                return "🌲 The T-3000"
            case 5:
                let pStr = this.reversiGame.reversi.getPlayers();
                if (pStr === null){
                    return "🧍 Against Someone..."
                }
                return pStr;
            default:
                return "WTF Something Went Wront!"
            }
    }

    handleMoveStart = (turn) => {
        this.timerStart(turn);
    }

    handleMoveEnd = () => {
        return this.timerEnd();
    }

    handleMoveAction = () =>{
        let turn = this.reversiGame.reversi.getTurn();
        let pieceCount = this.reversiGame.reversi.getPieceCount();

        let gameOver = this.reversiGame.reversi.getOver();
        //console.log(gameOver)
        //game is over
        let winner = pieceVal.EMPTY;
        if (gameOver){
            if (pieceCount.white < pieceCount.black){
                winner = pieceVal.BLACK;
            } else if(pieceCount.white > pieceCount.black ){
                winner = pieceVal.WHITE;
            }
        }

        this.setState({
            gameOver: gameOver,
        });

        this.setTurn(turn === pieceVal.BLACK, this.reversiGame.reversi.getMadeMoves());
        let lastMove = this.reversiGame.reversi.getLastMove();
        if (lastMove !== null){
            this.setLastMove(lastMove);
        }
        this.setCount(pieceCount);
        this.setOpp(this.getOppStr(this.aiDiff));
        this.setGameWinner(gameOver, winner);
    }

    incrementRegister = () => {
        this.statsRegisterCount += 1;
        if (this.statsRegisterCount === 8){
            this.setState({
                boardVisible: true,
            });
        }
    }

    lastMove = (func)=> {
        this.setLastMove = func;
        this.incrementRegister();
    }

    setWinner = (func)=> {
        this.setGameWinner = func;
        this.incrementRegister();
    }

    handleTurn = (func) =>{
        this.setTurn = func;
        this.incrementRegister();
    }

    handleCount = (func) =>{
        this.setCount = func;
        this.incrementRegister();
    }

    startTimer = (func) =>{
        this.timerStart = func;
        this.incrementRegister();
    }

    endTimer = (func) =>{
        this.timerEnd = func;
        this.incrementRegister();
    }

    setTimer = (func) =>{
        this.timerSet = func;
        this.incrementRegister();
    }

    handleOpp = (func) =>{
        this.setOpp = func;
        this.setOpp(this.getOppStr(this.aiDiff));
        this.incrementRegister();
    }

    render(){
        return (
            <div>
                <Nav />
                {this.state.gameOver && <div className="pyro">
                    <div className="before"></div>
                    <div className="after"></div>
                </div>}
                <div className="container mt-4 mb-4">
                    <h1 className="text-center noSelect"><span role="img" aria-label="blackCircle">⚫</span>Reversi Game Room<span role="img" aria-label="whiteCircle">⚪</span></h1>
                </div>
                <div className="container">
                    <div className = "row">
                        {(this.state.boardVisible) &&  <Board gameDetails={this.reversiGame}/>}
                        <Stats updateDetails={this.statsMan}/>
                    </div>
                </div>
            </div>
        );
      };
}

export default Game;
