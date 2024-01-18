import { useState } from 'react'
import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Logs from './components/Logs'
import GameOver from './components/GameOver'
import { WINNING_COMBINATIONS } from './winning-combinations'

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X'
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') currentPlayer = 'O'

  return currentPlayer
}

function App() {
  const [gameTurns, setGameTurns] = useState([])

  const currentPlayer = deriveActivePlayer(gameTurns)

  let gameBoard = [...initialGameBoard.map(array => [...array])]
  for (let turn of gameTurns) {
    gameBoard[turn.square.row][turn.square.col] = turn.player
  }

  let winner
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col]

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner

  function handleSquarePlayer(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns
      ]

      return updatedTurns
    })
  }

  function handleRestart() {
    console.log('setGameTurns')
    setGameTurns([])
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player name='Player 1' symbol='X' activePlayer={currentPlayer} />
          <Player name='Player 2' symbol='O' activePlayer={currentPlayer} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}  />}
        <GameBoard onSelectSquare={handleSquarePlayer} board={gameBoard} />
      </div>
      <Logs gameTurns={gameTurns} />
    </main>
  )
}

export default App
