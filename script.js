const X_CLASS = 'x'
const O_CLASS = 'circle'
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
// const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let playerXTurn

beginGame()

restartButton.addEventListener('click', beginGame)

function beginGame() {
  messageDisplay.classList.remove('show-overlay')
  playerXTurn = true
  cellsList.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(O_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  // set initial board hover effect
  setHoverClass()
}

function handleClick(e) {
  const clickedCell = e.target
  const currentClass = playerXTurn ? X_CLASS : O_CLASS
  // Make move
  placeMark(clickedCell, currentClass)
  // check for WIN or DRAW
  if (checkWin(currentClass)) {
    endGame(true)
  } else if (checkDraw()) {
    endGame(false)
  } else {
    playerSwap()
    // set board hover according to player turn
    setHoverClass()
  }
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