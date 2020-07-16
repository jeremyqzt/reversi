import React, { Component } from 'react';
import {Piece, pieceVal} from './Piece';
import {GreedyAI, RandomAI} from '../reversiLogic/dumbAIs';
import MinMaxAlgo from '../reversiLogic/minMaxAI';

import '../css/board.css';
import reversiLogic from '../reversiLogic/reversi';


class Board extends Component {
      constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.gridRef = [];
        let grid = this.initBoard(8,8);
        this.highlighted = [];
        this.availMoves = {};
        this.reversiGame = this.props.gameDetails.reversi; //new reversiLogic();
        this.updateStats = this.props.gameDetails.moveAct;
        this.aiDiff = this.props.gameDetails.aiDiff;
        this.state = {
            grid: grid,
        }
        this.pieceOutstanding = 64;

      }

      async handleClick(e, i, j, piece){
        let toRender = this.reversiGame.getTurn();

        //Human always plays blk, return if not your turn
        if (this.aiDiff !== 0 && toRender !== pieceVal.BLACK){
          return;
        }

        let move = {
          row: i,
          col: j,
        }
        if (this.reversiGame.makeMove(move) !== null){
          this.removeHighlight();
          this.updateStats();
          await this.postMoveActions(move, `R${i}C${j}`, toRender);
        }
  
        if (this.aiDiff !== 0){
          this.getAiMove();
        } else {
          this.postMoveHumanHelp();
        }

        //console.log(this.reversiGame.getOver());
      }

      postMoveHumanHelp(){
        this.getAvailAndMark();
        this.updateStats();
      }

      async postMoveActions(move, idx, toRender){
        this.gridRef[move.row][move.col].setPiece(toRender);
        await this.flipBulkPieces(this.availMoves[idx], toRender);
      }

      async getAiMove(){
        let aiTurn = pieceVal.WHITE;
        let aiMove = null;
        let minMaxStat = null
        this.getAvail();
        while (aiTurn === this.reversiGame.getTurn() && this.reversiGame.getOver() === false){
          switch(this.aiDiff){
            case 1:
              aiMove = RandomAI.getRandomMove(this.availMoves);
              await new Promise(r => setTimeout(r, 100));
              break;
            case 2:
              aiMove = GreedyAI.getGreedyMove(this.availMoves);
              await new Promise(r => setTimeout(r, 300));
              break;
            case 3:
              minMaxStat = await MinMaxAlgo.getMinMaxMove(this.reversiGame.getDuplicateGrid(), 4, aiTurn);
              aiMove = minMaxStat.move;
              //console.log(minMaxStat.score);
              break;
            default:
              break;
          }

          //Actually make the move

          let moveObj = reversiLogic.objFromKey(aiMove);
          this.reversiGame.makeMove(moveObj);
          await this.postMoveActions(moveObj, aiMove, aiTurn);
          this.getAvail();
        }
        //Once done, help human again
        this.postMoveHumanHelp();

      }

      async flipBulkPieces(toFlip, flipTo){
        for (let i = 0; i < toFlip.length; i++){
          let [row, col] = [toFlip[i].row, toFlip[i].col];
          this.gridRef[row][col].setPiece(flipTo);
          await new Promise(r => setTimeout(r, 300));
        }
      }

      removeHighlight = () =>{
        for (let i = 0 ;i < this.highlighted.length; i++){
          let square = this.highlighted[i];
          let origColor =  this.gridRef[square.row][square.col].getOriginalColor();
          this.gridRef[square.row][square.col].setBackGround(origColor);
        }
      }

      getAvail = () => {
        this.availMoves = this.reversiGame.getPossibleMovesAndFlip();
      }

      getAvailAndMark = () => {
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
          this.getAvailAndMark();
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
