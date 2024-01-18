const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

export default function GameBoard({ onSelectSquare, turns }) {
  let gameBoard = initialGameBoard

  for (let turn of turns) {
    gameBoard[turn.square.row][turn.square.col] = turn.player
  }
  return (
    <ol id='game-board'>
      {gameBoard.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                  <button
                    disabled={playerSymbol !== null ? 'disabled' : ''}
                    onClick={() => onSelectSquare(rowIndex, colIndex)}
                  >
                    {playerSymbol}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        )
      })}
    </ol>
  )
}
