import React, { Component } from 'react';
import {Piece, pieceVal} from './Piece';
import reversiLogic from '../reversiLogic/reversi';

import '../css/board.css';


class Board extends Component {
      constructor(props) {
        super(props);
        this.gridRef = [];
        let grid = this.initBoard(8,8);
        this.state = {
            grid: grid,
        }
        this.pieceOutstanding = 64;
      }

      handleClick = (e, i, j, piece) => {
        //console.log(e.target)
        //console.log(`${i} ${j}`);
        if (!piece.hasPieceAlready()){
          piece.setPiece(pieceVal.BLACK);
        }
      }

      
      registerPiece = (i, j, obj) => {
        this.gridRef[i][j] = obj;
        this.pieceOutstanding -= 1;

        if (this.pieceOutstanding === 0){
          this.reversiGame = new reversiLogic();
          let availMoves = this.reversiGame.getPossibleMovesAndFlip();
          for (let key in availMoves){
            let row = parseInt(key.charAt(1));
            let col = parseInt(key.charAt(3));
            this.gridRef[row][col].setBackGround("highlighted");
            console.log(`${row}, ${col}`);
          }
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
