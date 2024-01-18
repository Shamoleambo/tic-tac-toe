export default function Logs({ gameTurns }) {
  return (
    <ol>
      {gameTurns.map(turn => {
        const { row, col } = turn.square
        const { player } = turn
        return (
          <li key={`${row}-${col}`}>
            {player} selected {row}, {col}
          </li>
        )
      })}
    </ol>
  )
}
