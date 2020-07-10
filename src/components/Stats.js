import React, { Component } from 'react';

import '../css/board.css';

class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            white: 2,
            black: 2,
            empty: 60,
            moves: 0,
            turn: "⚫ Black",
            opponent: "🤖 Beep-Boop",
        }
        this.props.updateDetails.turn(this.setTurn);
        this.props.updateDetails.count(this.setPieceCount);
        this.props.updateDetails.opp(this.setOpp);

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
    
      setTurn = (blackTurn) => {
        this.setState({
            moves: this.state.moves + 1,
            turn: (blackTurn) ? "⚫ Black" :"⚪ White",
        });
      }

      setOpp = (opp) => {
        this.setState({
            opponent: opp,
        });
      }

    render(){
        return (
            <div className="col-4 w-100 noSelect">
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center">Current Turn</h2>
                        <p className="text-center">➡{this.state.turn} to Move</p>
                        <p className="text-center">{this.state.moves} Moves Made so Far!</p>

                    </div>
                </div>
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
            </div>
        );
      };
}

export default Stats;
