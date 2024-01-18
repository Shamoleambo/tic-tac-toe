export default function GameOver({ winner, onRestart, players }) {
  return (
    <div id='game-over'>
      <h2>Game Over!</h2>
      {winner && <p>{winner === 'X' ? players['X'] : players['O']} won!</p>}
      {!winner && <p>Draw</p>}
      <p>
        <button onClick={onRestart}>Restart</button>
      </p>
    </div>
  )
}
