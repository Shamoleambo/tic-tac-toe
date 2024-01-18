import { useState } from 'react'
import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Logs from './components/Logs'

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X'
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') currentPlayer = 'O'

  return currentPlayer
}

function App() {
  const [gameTurns, setGameTurns] = useState([])

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
