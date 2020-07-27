import React, { Component } from 'react';

import '../css/board.css';
import { pieceVal } from './Piece';

class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            white: 2,
            black: 2,
            empty: 60,
            moves: 0,
            turn: "⚫ Black",
            lastMove: "No Moves Made Yet!",
            opponent: "🤖 Beep-Boop",
            someoneWon: false,
            winnerMsg: "",
        }
    }

    componentDidMount = () => {
        this.props.updateDetails.turn(this.setTurn);
        this.props.updateDetails.count(this.setPieceCount);
        this.props.updateDetails.opp(this.setOpp);
        this.props.updateDetails.lastMove(this.setLastMove);
        this.props.updateDetails.winner(this.setWinner);
    }

    setPieceCount = (inCount) => {
        let white = inCount.white;
        let black = inCount.black;
        let empty = 64 - (white + black);
        this.setState({
            white: white,
            black: black,
            empty: empty,
        });
      }
    
      setWinner = (won, winner) => {
        let winningPiece = "⚫⚪ Its a Tie!"
        winningPiece = (winner === pieceVal.BLACK) ? "⚫ Black Has Won!" :"⚪ White Has Won!";
        if (won){
            this.setState({
                someoneWon: won,
                winnerMsg: winningPiece,
            });
        }
      }

      setTurn = (blackTurn, moves) => {
        this.setState({
            moves: moves,
            turn: (blackTurn) ? "⚫ Black" :"⚪ White",
        });
      }

      setOpp = (opp) => {
        this.setState({
            opponent: opp,
        });
      }

      setLastMove = (mov) =>{
        let move = "No Moves Made Yet!";
        if (mov !== null){
            move = (mov.by === pieceVal.BLACK)? "⚫": "⚪";
        }
        move = `${move} Placed a Piece at Row ${mov.row + 1} Column ${mov.col + 1}, Capturing ${mov.count} Pieces!`
        this.setState({
            lastMove: move
        });
      }

    render(){
        return (
            <div className="col-4 w-100 noSelect">
                {!this.state.someoneWon && <div className="row">
                    <div className="col-12">
                        <h2 className="text-center">Current Turn</h2>
                        <p className="text-center">➡{this.state.turn} to Move</p>
                        <p className="text-center">{this.state.moves} Moves Made so Far!</p>
                    </div>
                </div>}
                {this.state.someoneWon && <div className="row">
                    <div className="col-12">
                        <h2 className="text-center"> <span role="img" aria-label="winner">👑</span>Winner</h2>
                        <p className="text-center"> {this.state.winnerMsg} </p>
                        <a href="/home" className="btn btn-outline-dark w-100"> Go Home </a>
                    </div>
                </div>}
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center">Current Pieces</h2>
                        <p className="text-center"><span role="img" aria-label="emptySquare">🔲</span> Empty X {this.state.empty}</p>

                        <p className="text-center"><span role="img" aria-label="whiteCircle">⚪</span> White X {this.state.white}</p>
                        <p className="text-center"><span role="img" aria-label="blackCircle">⚫</span> Black X {this.state.black}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center">Current Opponent</h2>
                        <p className="text-center">{this.state.opponent}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center">Last Move</h2>
                        <p className="text-center">{this.state.lastMove}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center">Time Remaining</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="progress">
                        <div className="progress-bar bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
      };
}

export default Stats;
