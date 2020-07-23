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
    let pieceColor = this.props.rendeDetails.piece === pieceVal.WHITE ? "whitePiece": "blackPiece";

    this.state = {
        color: color,
        originalColor: color,
        hasPiece: this.props.rendeDetails.hasPiece,
        piece: this.props.rendeDetails.piece,
        pieceColor: pieceColor,
    };
  }

  //Tell Parent that we mounted
  componentDidMount(){
    this.props.rendeDetails.registration(this.props.rendeDetails.row, this.props.rendeDetails.col, this);
  }

  getOriginalColor = () =>{
    return this.state.originalColor;
  }

  setPiece = (val) => {
    let pieceColor = (val === pieceVal.WHITE) ? "whitePiece": "blackPiece";
    this.setState({
        piece: val,
        hasPiece:  true,
        pieceColor: pieceColor,
    });
  }

  removePiece = () => {
    this.setState({
        piece: pieceVal.BLACK,
        hasPiece:  false,
        pieceColor: "blackPiece",
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
    return (
      <div className={`flex-item ${this.state.color}`} onClick={e => this.props.rendeDetails.action(e, this.props.rendeDetails.row, this.props.rendeDetails.col, this)}>
        {hasPiece && <div className={`circle ${this.state.pieceColor}`}></div>}
      </div>
    );
  };
}

export {Piece, pieceVal} ;
