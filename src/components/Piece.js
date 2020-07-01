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
        hasPiece: this.props.rendeDetails.hasPiece,
        piece: this.props.rendeDetails.piece,
        background: this.props.rendeDetails.background,
    }
  }

  setPiece = (val) => {
    console.log(this);
    this.setState({
        piece: val,
        hasPiece:  true,
    });
  }

  hasPieceAlready = () => {
    return this.state.hasPiece;
  }

  render(){
    let color = this.state.background ? "blackBoard": "whiteBoard";
    let hasPiece = this.state.hasPiece;
    let pieceColor = (this.state.piece === pieceVal.WHITE) ? "whitePiece": "blackPiece";
    return (
      <div className={`flex-item ${color}`} onClick={e => this.props.rendeDetails.action(e, this.props.rendeDetails.row, this.props.rendeDetails.col, this)}>
        {hasPiece && <div className={`circle ${pieceColor}`}></div>}
      </div>
    );
  };
}

export {Piece, pieceVal} ;
