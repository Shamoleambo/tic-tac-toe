import { useState } from 'react'
import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Logs from './components/Logs'

function App() {
  const [activePlayer, setActivePlayer] = useState('X')
  const [gameTurns, setGameTurns] = useState([])

  function handleSquarePlayer(rowIndex, colIndex) {
    setActivePlayer((currentPlayer) => (currentPlayer === 'X' ? 'O' : 'X'))
    setGameTurns((prevTurns) => {
      let currentPlayer = 'X'
      if (prevTurns.length > 0 && prevTurns[0].player === 'X')
        currentPlayer = 'O'

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: activePlayer },
        ...prevTurns
      ]

      return updatedTurns
    })
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player name='Player 1' symbol='X' activePlayer={activePlayer} />
          <Player name='Player 2' symbol='O' activePlayer={activePlayer} />
        </ol>
        <GameBoard
          onSelectSquare={handleSquarePlayer}
          turns={gameTurns}
        />
      </div>
      <Logs gameTurns={gameTurns}/>
    </main>
  )
}

export default App
