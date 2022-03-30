const X_CLASS = 'x' // Human Player
const O_CLASS = 'circle'  // AI Player
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],    
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellsList = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board-game')
const messageDisplay = document.getElementById('gameMessage')
const restartButton = document.getElementById('restartBtn')
let playerXTurn

beginGame()

restartButton.addEventListener('click', beginGame)

function beginGame() {
  messageDisplay.classList.remove('show-overlay')
  playerXTurn = true  // human player - us
  cellsList.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(O_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  // set initial board hover effect
  setHoverClass()
}

function isGameOver(currentClass) {
  // check for WIN or DRAW
  if (checkWin(currentClass)) {
    endGame(true)
    return true
  } else if (checkDraw()) {
    endGame(false)
    return true
  }
  return false  
}

function getPlayerMovesTillNow() {  // change name
  return [...cellsList].map((htmlCell) => {
    if(htmlCell.classList.contains(X_CLASS)) return X_CLASS
    if(htmlCell.classList.contains(O_CLASS)) return O_CLASS
    return ''
  })
}

function handleClick(e) {
  const clickedCell = e.target
  const currentClass = playerXTurn ? X_CLASS : O_CLASS
  // Make move
  placeMark(clickedCell, currentClass)
  if (isGameOver(currentClass)) return

  playerSwap()
  const { cellIndex } = minimax(getPlayerMovesTillNow(), O_CLASS) // minimax AI opponent
  placeMark(cellsList[cellIndex], O_CLASS)
  if(isGameOver(O_CLASS)) return
  playerSwap()
  setHoverClass() // set board hover according to player turn
}

function endGame(isWin) {
    messageDisplay.classList.add('show-overlay')
  if (isWin) {
    messageDisplay.children[0].innerText = `${playerXTurn ? "X" : "O"} Wins!`
  } else {
    messageDisplay.children[0].innerText = `It's a draw!`
  }
//   winningMessageElement.classList.add('show')
}

function checkDraw() {
  return [...cellsList].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function playerSwap() {
  playerXTurn = !playerXTurn
}

function setHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(O_CLASS)
  if (playerXTurn) {
    board.classList.add(X_CLASS)
  } else {
    board.classList.add(O_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(cellindex => {
      return cellsList[cellindex].classList.contains(currentClass)
    })
  })
}
