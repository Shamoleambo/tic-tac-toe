export default function GameBoard({ onSelectSquare, board }) {
  return (
    <ol id='game-board'>
      {board.map((row, rowIndex) => {
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
