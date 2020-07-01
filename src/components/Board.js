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

      initBoard(x,y){
        let grid = [];
        let row = []
        let background = true;
        for (let i = 0; i < x; i++){
            for (let j = 0; j < y; j++){
              row.push(<Piece />);
              background = !background;
            }
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
      console.log(grid);
        return (
        <body><div className="container">{grid}</div></body>
        );
      };
}

export default Board;
