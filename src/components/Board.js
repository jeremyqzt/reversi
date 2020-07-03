import React, { Component } from 'react';
import {Piece, pieceVal} from './Piece';

import '../css/board.css';

class Board extends Component {
      constructor(props) {
        super(props);
        this.gridRef = [];
        let grid = this.initBoard(8,8);
        this.state = {
            grid: grid,
        }
      }

      handleClick = (e, i, j, piece) => {
        //console.log(e.target)
        //console.log(`${i} ${j}`);
        if (!piece.hasPieceAlready()){
          piece.setPiece(pieceVal.BLACK);
        }
      }

      initBoard = (x,y) =>{
        let grid = [];
        let row = []
        let rowRef = []
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
              }
              //let pieceToRender = this.createComponent("Piece", pieceProps);
              //row.push(pieceToRender);
              let item = React.createRef();
              row.push(<Piece key={`R${i}C${j}`} rendeDetails={pieceProps} ref={item}/>);
              console.log(item.current);
              rowRef.push(item);
              background = !background;
            }
          background = !background;
          grid.push(<div key={`R${i}`}className= "flex-container">{ row } </div>);
          this.gridRef.push(rowRef);
          row = [];
          rowRef = [];
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
