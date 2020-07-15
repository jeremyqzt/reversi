// eslint-disable-next-line
import {_, pieceVal} from '../components/Piece';

import reversiLogic from './reversi';

class MinMaxAlgo {
	static async getMinMaxMove(gameSituation, depth, turn) {
		let curGame = new reversiLogic(gameSituation, turn);
		let avail = curGame.getPossibleMovesAndFlip();
		let maxOrMin = 64;

		//AI always uses white...
		if(turn === pieceVal.WHITE) {
			maxOrMin = -64;
		}

		let nextFavour = 0;
		let moveIdx = null;
		let nextState = null;

		if (depth > 0) {
			for (let key in avail) {
				let gameCpy = curGame.board.getDuplicateGrid(); //Arrays are mutable and passed as reference, must rebuild
				nextState = new reversiLogic(gameCpy, turn);
				nextState.makeMove(avail[key]);
				nextFavour = await MinMaxAlgo.getMinMaxMove(nextState.getDuplicateGrid(), (depth - 1), nextState.getTurn()).score;

				//Assuming white maximizes and black minimizes
				if (turn === pieceVal.WHITE && nextFavour > maxOrMin) {
					maxOrMin = nextFavour;
					moveIdx = key;
				} else if (turn === pieceVal.BLACK && nextFavour < maxOrMin) {
					maxOrMin = nextFavour;
					moveIdx = key;
				}
			}
		} else {
			//bottom level move, only really care about score...
			return {
					score: MinMaxAlgo.computeBoardGoodness(gameSituation),
				};
		}

		return {
				score: maxOrMin,
				move: avail[moveIdx],
			};
	}

	static computeBoardGoodness(board) {
		let favourability = 0
		//We take black as -ve and white as +ve in this calculation
		for (var i = 0; i < board.length; i++) {
			for (var j = 0; j < board[i].length; j++){
				if (board[i][j] === pieceVal.EMPTY) {
					continue;
				} else if (board[i][j].type === pieceVal.WHITE) {
					favourability++;
				} else {
					favourability--;
				}
			}
		}

		return favourability;
	}
}

export default MinMaxAlgo;