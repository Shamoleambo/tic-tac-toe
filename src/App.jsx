import { useState } from 'react'
import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Logs from './components/Logs'
import GameOver from './components/GameOver'
import { WINNING_COMBINATIONS } from './winning-combinations'

const INITIAL_GAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X'
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') currentPlayer = 'O'

  return currentPlayer
}

function deriveWinnerFrom(gameBoard) {
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col]

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      return firstSquareSymbol
    }
  }
}

function getGameBoardFrom(gameTurns) {
  let gameBoard = [...INITIAL_GAMEBOARD.map((array) => [...array])]
  for (let turn of gameTurns) {
    gameBoard[turn.square.row][turn.square.col] = turn.player
  }
  return gameBoard
}

function App() {
  const [gameTurns, setGameTurns] = useState([])
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2'
  })

  const gameBoard = getGameBoardFrom(gameTurns)
  const currentPlayer = deriveActivePlayer(gameTurns)
  const winner = deriveWinnerFrom(gameBoard)
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
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newName }
    })
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player
            name='Player 1'
            symbol='X'
            activePlayer={currentPlayer}
            onEditName={handlePlayerNameChange}
          />
          <Player
            name='Player 2'
            symbol='O'
            activePlayer={currentPlayer}
            onEditName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver
            winner={winner}
            onRestart={handleRestart}
            players={players}
          />
        )}
        <GameBoard onSelectSquare={handleSquarePlayer} board={gameBoard} />
      </div>
      <Logs gameTurns={gameTurns} />
    </main>
  )
}

export default App
