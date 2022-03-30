let scores = {
  'x':  10,
  'circle': -10,
  'tie': 0,
};

function findBestMove(possibleScores, player) {
  // Comparing scores of all possible moves(from next level) to find best move from root Node of game tree
  let bestMove = {};
  if (player === O_CLASS) {
    let bestScore = Infinity;
    possibleScores.forEach((currentScore, index) => {
      if (currentScore.score < bestScore) {
        bestMove.score = currentScore.score;
        bestMove.cellIndex = currentScore.cellIndex;
      }
    });
  } else if(player === X_CLASS){
    let bestScore = -Infinity;
    possibleScores.forEach((currentScore, index) => {
      if (currentScore.score > bestScore) {
        bestMove.score = currentScore.score;
        bestMove.cellIndex = currentScore.cellIndex;
      }
    });
  }
  return bestMove;
}

function checkMinimaxWinner(board, player) {
  return WINNING_COMBINATIONS.some(combo => {
    return combo.every(cellIndex => board[cellIndex] === player)
    })
}

/**
 * 
 * @param {Array} newBoard - array of all cells of game board with name of player moves, new board configuration at different points of time.
 * @param {String} player - css class
 * @returns {Object} - 2 props - score and cellIndex of next move for AI player
 * 
 * example of newBoard - [X_CLASS, '', O_CLASS, '', '', '', '', '', '', '']
 * example of availableSpots - [1,3,4,5,6,7,8,9]
 * 'X' = human player -> maximise utility/score
 * 'O' = AI player -> minimise utility/score
 */

function minimax(newBoard, player) {
  let availableSpots = newBoard.reduce((finalArray,spot,index) => { 
    if(spot === '') finalArray.push(index) 
    return finalArray
  }, [])

  // Terminal States/Leaf Nodes
  if (checkMinimaxWinner(newBoard, player)) {
    return {score: scores[player]};
  } else if (availableSpots.length === 0) {
    return {score: scores['tie']};
  }
  let possibleScores = [], selectedMove = {}; // move object will store 2 props - score and cellIndex of cell in game board

  for (let cellIndex of availableSpots) {
    selectedMove.cellIndex = cellIndex;
    let newBoardState = [...newBoard]
    newBoardState[cellIndex] = player
    if (player === O_CLASS) {
      let result = minimax(newBoardState, X_CLASS);
      selectedMove.score = result.score;
      if(result.score === scores[O_CLASS]) return selectedMove  // if highest score reached, return that move rather than going the long way
    } else {
      let result = minimax(newBoardState, O_CLASS);
      selectedMove.score = result.score;
      if(result.score === scores[X_CLASS]) return selectedMove
    }
    possibleScores.push(selectedMove); // push all possible moves of 2nd level to choose from later
  }

  return findBestMove(possibleScores, player)
}
