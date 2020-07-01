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
    super(props);
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
    //let color = this.props.value.background ? "blackBoard": "whiteBoard";
    return (
      <div className="flex-item"></div>
    );
  };
}

export {Piece, pieceVal} ;
