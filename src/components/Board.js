import React, { Component } from 'react';
import {Piece, pieceVal} from './Piece';
import {GreedyAI, RandomAI} from '../reversiLogic/dumbAIs';
import MinMaxAlgo from '../reversiLogic/minMaxAI';

import '../css/board.css';
import '../css/alerts.css';

import reversiLogic from '../reversiLogic/reversi';
import serverComm from '../utils/serverComm.js';
import timerHelper from '../utils/timeHelper.js';

import boardClickSound from '../sound/move.wav';
import clickSound from '../sound/click.wav';

class Board extends Component {
      constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.placePieceSound = this.placePieceSound.bind(this);
        this.placeClickSound = this.placeClickSound.bind(this);
        this.getServerMoveLoop = this.getServerMoveLoop.bind(this);

        this.gridRef = [];
        let grid = this.initBoard(8,8);
        this.highlighted = [];
        this.availMoves = {};
        this.reversiGame = this.props.gameDetails.reversi; //new reversiLogic();
        this.moveStartAct = this.props.gameDetails.moveStartAct;
        this.moveEndAct = this.props.gameDetails.moveEndAct;
        this.setTime = this.props.gameDetails.setTime;


        this.updateStats = this.props.gameDetails.moveAct;
        this.mode = this.props.gameDetails.aiDiff;


        this.state = {
            grid: grid,
            okayToRender: (this.mode !== 5),
        };

        this.over = false;
        this.moveId = 0;
        this.pieceOutstanding = 64;
        this.overCounter = 0;
        this.blockServerUpdate = false;
      }

      componentDidMount = () =>{
        if (this.mode === 5){
          this.getServerMoveLoop(); //Actually not a loop, its recursive;
        } else {
          this.okayToMove = true;
        }
      }

      async handleClick(e, i, j, piece){
        let toRender = this.reversiGame.getTurn();
        
        if (this.over || !this.okayToMove){
          return;
        }

        this.blockServerUpdate = true;

        //Human always plays blk, return if not your turn
        if ((this.mode === 1 || this.mode === 2 || this.mode === 3) && toRender !== pieceVal.BLACK){
          return;
        }

        let move = {
          row: i,
          col: j,
        };

        if (this.reversiGame.makeMove(move) !== null){
          this.removeHighlight();
          this.updateStats();
          this.placePieceSound();
          await this.postMoveActions(move, `R${i}C${j}`, toRender);
        
          if (this.mode !== 0 && this.mode !== 5){ //1-3 is AI
            await new Promise(r => setTimeout(r, 500));
            this.getAiMove();
          } else if (this.mode === 0){ //0 is 2 player, LAN
            this.postMoveHumanHelp();
          } else if(this.mode === 5){ //5 is 2 player
            this.makeServerMove(move);
          }
        }
        //console.log(this.reversiGame.getOver());
      }

      async getServerMoveLoop(){
        let postLocat = "api/game?turn=1&over=1&grid=1"
        serverComm.get(postLocat)
        .then(result =>{
          if (result.status >= 200 && result.status < 300){
            return result.json();
          }
          return Promise.reject(result.json());
        })
        .then((result) => {
          this.okayToMove = false;

          if (result.game.users.length >= 2){
            this.setState({
              okayToRender: true,
            });
          }

          if (this.blockServerUpdate){
            this.blockServerUpdate = false;
            return;
          }

          this.reversiGame.setPlayers(result.game.users);
          this.over = result.game.over;

          //Can only set timer if timer is stopped, but we never start so...
          //this.setTime({min: 10, sec: 30}, {min: 15, sec: 45});
          let blackTimeleft = timerHelper.convertSecondMin(result.game.blackTimeLeft);
          let whiteTimeleft = timerHelper.convertSecondMin(result.game.whiteTimeLeft);
          //console.log(result.game);
          this.setTime(blackTimeleft, whiteTimeleft);
          this.reversiGame.setTimeRemain(blackTimeleft, whiteTimeleft);

          if (result.game.move === this.moveId + 1 && result.game.over === false){
            this.moveId = result.game.move;
            let lastMove = result.game.lastMove;
            let move = reversiLogic.objFromKey(lastMove);
            if (this.reversiGame.makeMove(move) !== null){
              this.removeHighlight();
              this.placePieceSound();
              this.serverMoved(move, `R${move.row}C${move.col}`, result.game.lastTurn);
            }
          } else if(result.game.move !== this.moveId){
            this.moveId = result.game.move;
            this.reRenderGrid(result.game.grid);
            this.removeHighlight();
            this.reversiGame.setGrid(result.game.grid);
            this.reversiGame.setTurn(result.game.turn);
            this.reversiGame.triggerRecompute();
          }
          this.updateStats();
          this.getAvail();
          let serverTurnIdx = result.game.turn - 1;
          let currentTurn = result.game.users[serverTurnIdx];
          if (currentTurn === result.game.you && result.game.over === false){
            this.postMoveHumanHelp();
            this.okayToMove = true;
          } else {
            this.removeHighlight();
          }
        })
        .catch((e)=> {
          this.moveId = -1;
          //console.log(result.game.move)
        });

        //while (document.hidden){
        //  await new Promise(r => setTimeout(r, 1000));
        //}
         
        await new Promise(r => setTimeout(r, 2000)); //I guess try for 2.0 sec
        if (!this.over){
          this.getServerMoveLoop();
        } else if (this.overCounter < 3){
          this.overCounter += 1;
          this.getServerMoveLoop();
          this.reversiGame.setServerOver();
        }
      }

      reRenderGrid(grid){
        for (let i = 0; i < grid.length; i++){
          for (let j = 0; j < grid[i].length; j++){
            if (grid[i][j] === pieceVal.BLACK){
              this.gridRef[i][j].setPiece(pieceVal.BLACK);
            } else if (grid[i][j] === pieceVal.WHITE){
              this.gridRef[i][j].setPiece(pieceVal.WHITE);
            } else {
              this.gridRef[i][j].removePiece();
            }
          }
        }
      }

      makeServerMove(data){
        let postLocat = "api/game"
        data.time = this.moveEndAct();
        serverComm.post(data, postLocat)
        .then(result =>{return result.json()})
        .then((result) => {
          this.moveId += 1;
          if (result.game.move !== this.moveId){  //Move rejected
            this.moveId = -1;
          }
        })
        .catch((result)=> {
          //Aha, reset so board re-renders
          this.moveId = -1;
        });
      }

      async serverMoved(move, idx, toRender){
        this.postMoveActions(move, idx, toRender);
        //this.postMoveHumanHelp();
      }

      postMoveHumanHelp(){
        this.getAvailAndMark();
        this.updateStats();
      }

      async postMoveActions(move, idx, toRender){
        try {
          this.gridRef[move.row][move.col].setPiece(toRender);
          await this.flipBulkPieces(this.availMoves[idx], toRender);
        } catch (e){
          this.moveId = -1; //Re-render...
        }
      }

      async getAiMove(){
        let aiTurn = pieceVal.WHITE;
        let aiMove = null;
        let minMaxStat = null
        this.getAvail();
        while (aiTurn === this.reversiGame.getTurn() && this.reversiGame.getOver() === false){
          switch(this.mode){
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
          this.placePieceSound();
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
          this.placeClickSound();
          await new Promise(r => setTimeout(r, 150));
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

      placePieceSound =()=>{
        var boardClick = new Audio (boardClickSound);
        boardClick.play();
      }

      placeClickSound =()=>{
        var click = new Audio (clickSound);
        click.play();
      }
    
      render(){
      let grid = this.state.grid;
        return (
          <>
            <div className = "col-8 text-center">
              {this.state.okayToRender && grid}
              {!this.state.okayToRender && <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>}
            </div>
          </>
        );
      };
}

export default Board;
