import React, { Component } from 'react';
import '../css/board.css';

const pieceVal = {
    EMPTY: 0,
    BLACK: 1,
    WHITE: 2,
    INVALUD: 3,
}

class Piece extends Component {
  constructor(props) {
    super();
    this.state = {
        squareValue: pieceVal.EMPTY,
    }
  }

  setPiece = (val) => {
    this.setState({
        squareValue: val,
    });
  }

  render(){
    return (
        <div class="col-xs-3 square">
        </div>
    );
  };
}

export default Piece;
