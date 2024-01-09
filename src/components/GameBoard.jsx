import { useState } from "react"

const initialStateBoardGame = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

export default function GameBoard() {
  const [gameBoard, setGameBoard] = useState(initialStateBoardGame)

  function handleSelectSquare(rowIndex, colIndex, symbol)  {
    setGameBoard(prevState => {
      const updatedBoard = [...prevState.map(innerArray => [...innerArray])]
      updatedBoard[rowIndex][colIndex] = '$'
      return updatedBoard
    })
  }

  return (
    <ol id='game-board'>
      {gameBoard.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                  <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                </li>
              ))}
            </ol>
          </li>
        )
      })}
    </ol>
  )
}
