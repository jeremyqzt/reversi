class GreedyAI {
	static getGreedyMove(moves) {
		var best = 0;
		var ret = null;
		for (var move in moves) {
			if (moves[move].length > best) {
				best = moves[move].length;
				ret = move;
			}
		}
		return ret;
	}
}

class RandomAI {
	static getRandomMove(moves) {
		return Object.keys(moves)[Math.floor(Math.random()*Object.keys(moves).length)];
	}
}

export {
	GreedyAI,
	RandomAI
}