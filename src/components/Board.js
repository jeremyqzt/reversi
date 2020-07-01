import React, { Component } from 'react';
import {Piece, pieceVal} from './Piece';

import '../css/board.css';

class Board extends Component {
      constructor(props) {
        super();
        let grid = this.initBoard(8,8);
        this.state = {
            grid: grid,
        }
      }

      initPieces(grid, piece, x, y){
        let pieceProps = {
          //background: background,
          piece: piece,
        }
        grid[x][y] = <Piece rendeDetails={pieceProps} />;
      }

      initBoard(x,y){
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
              }
              row.push(<Piece key={`R${i}C${j}`} rendeDetails={pieceProps} />);
              background = !background;
            }
          background = !background;
          grid.push(<div className = "flex-container">{ row } </div>);
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
        <div className="container"><div class = "row"><div class = "col-9">{grid}</div></div></div>
        );
      };
}

export default Board;
