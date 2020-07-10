import React, { Component } from 'react';
import {Piece, pieceVal} from './Piece';

import '../css/board.css';


class Board extends Component {
      constructor(props) {
        super(props);
        this.gridRef = [];
        let grid = this.initBoard(8,8);
        this.highlighted = [];
        this.availMoves = {};
        this.reversiGame = this.props.gameDetails.reversi; //new reversiLogic();
        this.updateStats = this.props.gameDetails.moveAct;
        this.state = {
            grid: grid,
        }
        this.pieceOutstanding = 64;
      }

      handleClick = (e, i, j, piece) => {
        let toRender = this.reversiGame.getTurn();
        let move = {
          row: i,
          col: j,
        }
        if (this.reversiGame.makeMove(move) !== null){
          this.gridRef[i][j].setPiece(toRender);
          this.flipBulkPieces(this.availMoves[`R${i}C${j}`], toRender);
          this.removeHighlight();
          this.computeAvailAndMark();
          this.updateStats();
        }
        console.log(this.reversiGame.getOver())
      }

      flipBulkPieces = (toFlip, flipTo)=>{
        for (let i = 0; i < toFlip.length; i++){
          let [row, col] = [toFlip[i].row, toFlip[i].col];
          this.gridRef[row][col].setPiece(flipTo);
        }
      }

      removeHighlight = () =>{
        for (let i = 0 ;i < this.highlighted.length; i++){
          let square = this.highlighted[i];
          let origColor =  this.gridRef[square.row][square.col].getOriginalColor();
          this.gridRef[square.row][square.col].setBackGround(origColor);
        }
      }

      computeAvailAndMark = () => {
        this.availMoves = this.reversiGame.getPossibleMovesAndFlip();
        for (let key in this.availMoves){
          let row = parseInt(key.charAt(1));
          let col = parseInt(key.charAt(3));
          this.gridRef[row][col].setBackGround("highlighted");
          this.highlighted.push(
            {
              row: row,
              col: col,
            }
          )
        }
      }

      
      registerPiece = (i, j, obj) => {
        this.gridRef[i][j] = obj;
        this.pieceOutstanding -= 1;

        if (this.pieceOutstanding === 0){
          this.computeAvailAndMark();
        }


      }

      initBoard = (x,y) =>{
        let grid = [];
        let row = []
        let background = true;
        for (let i = 0; i < x; i++){
            for (let j = 0; j < y; j++){
              let piece = pieceVal.EMPTY;
              let hasPiece = false;
              if ((i=== 3 && j===3) || (i === 4 && j===4)){piece = pieceVal.WHITE; hasPiece = true;}
              if ((i=== 3 && j===4) || (i === 4 && j===3)){piece = pieceVal.BLACK; hasPiece = true;}

              let pieceProps = {
                background: background,
                piece: piece,
                hasPiece: hasPiece,
                row: i,
                col: j,
                action: this.handleClick,
                registration: this.registerPiece,
              }
              //let pieceToRender = this.createComponent("Piece", pieceProps);
              //row.push(pieceToRender);
              row.push(<Piece key={`R${i}C${j}`} rendeDetails={pieceProps}/>);
              background = !background;
            }
          background = !background;
          grid.push(<div key={`R${i}`}className= "flex-container">{ row } </div>);
          this.gridRef.push(new Array(8));
          row = [];
        }
        return grid;
      }
    
      setPiece = (val) => {
        this.setState({
            squareValue: val,
        });
      }
    
      render(){
      let grid = this.state.grid;
        return (
          <div className = "col-8">
            {grid}
          </div>
        );
      };
}

export default Board;
