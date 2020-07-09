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
    let color = this.props.rendeDetails.background ? "blackBoard": "whiteBoard";

    this.state = {
        color: color,
        originalColor: color,
        hasPiece: this.props.rendeDetails.hasPiece,
        piece: this.props.rendeDetails.piece,
    };
  }

  //Tell Parent that we mounted
  componentDidMount(){
    this.props.rendeDetails.registration(this.props.rendeDetails.row, this.props.rendeDetails.col, this);
  }

  setPiece = (val) => {
    this.setState({
        piece: val,
        hasPiece:  true,
    });
  }

  hasPieceAlready = () => {
    return this.state.hasPiece;
  }

  setBackGround(background){
    this.setState({
      color: background,
    });  
  }

  render(){
    let hasPiece = this.state.hasPiece;
    let pieceColor = (this.state.piece === pieceVal.WHITE) ? "whitePiece": "blackPiece";
    return (
      <div className={`flex-item ${this.state.color}`} onClick={e => this.props.rendeDetails.action(e, this.props.rendeDetails.row, this.props.rendeDetails.col, this)}>
        {hasPiece && <div className={`circle ${pieceColor}`}></div>}
      </div>
    );
  };
}

export {Piece, pieceVal} ;
