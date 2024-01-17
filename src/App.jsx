import { useState } from 'react'
import Player from './components/Player'
import GameBoard from './components/GameBoard'

function App() {
  const [activePlayer, setActivePlayer] = useState('X')

  function handleSquarePlayer() {
    setActivePlayer((currentPlayer) => (currentPlayer === 'X' ? 'O' : 'X'))
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player name='Player 1' symbol='X' activePlayer={activePlayer} />
          <Player name='Player 2' symbol='O' activePlayer={activePlayer} />
        </ol>
        <GameBoard
          playerSymbol={activePlayer}
          onSelectSquare={handleSquarePlayer}
        />
      </div>
      LOGS
    </main>
  )
}

export default App
