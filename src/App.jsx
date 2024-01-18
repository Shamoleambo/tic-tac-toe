import { useState, useEffect } from 'react'
import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Logs from './components/Logs'
import { WINNING_COMBINATIONS } from './winning-combinations'

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X'
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') currentPlayer = 'O'

  return currentPlayer
}

function App() {
  const [gameTurns, setGameTurns] = useState([])

  useEffect(() => {
    let win = false
    WINNING_COMBINATIONS.forEach((winCondition) => {
      let checkArray = gameTurns.filter(
        (turn) =>
          (turn.square.row === winCondition[0].row &&
            turn.square.col === winCondition[0].col) ||
          (turn.square.row === winCondition[1].row &&
            turn.square.col === winCondition[1].col) ||
          (turn.square.row === winCondition[2].row &&
            turn.square.col === winCondition[2].col)
      )

      if (checkArray.length === 3) {
        win =
          checkArray.every((play) => play.player === 'X') ||
          checkArray.every((play) => play.player === 'O')
          if (win) console.log('YOU WIN MOTHERFUCKER!!')
      }
    })
  })

  const currentPlayer = deriveActivePlayer(gameTurns)

  function handleSquarePlayer(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns
      ]

      return updatedTurns
    })
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player name='Player 1' symbol='X' activePlayer={currentPlayer} />
          <Player name='Player 2' symbol='O' activePlayer={currentPlayer} />
        </ol>
        <GameBoard onSelectSquare={handleSquarePlayer} turns={gameTurns} />
      </div>
      <Logs gameTurns={gameTurns} />
    </main>
  )
}

export default App
