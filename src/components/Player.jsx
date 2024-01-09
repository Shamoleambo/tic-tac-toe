import { useState } from 'react'

export default function Player({ name, symbol }) {
  const [playerName, setPlayerName] = useState(name)
  const [editMode, setEditMode] = useState(false)

  const handlePlayerName = (event) => {
    setPlayerName(event.target.value)
  }

  const handleEditClick = () => {
    setEditMode((prevState) => !prevState)
  }
  return (
    <li>
      <span className='player'>
        {editMode === true ? (
          <input type='text' onChange={handlePlayerName} value={playerName}></input>
        ) : (
          <span className='player-name'>{playerName}</span>
        )}
        <span className='player-symbol'>{symbol}</span>
      </span>
      <button onClick={handleEditClick}>
        {editMode === true ? 'Save' : 'Edit'}
      </button>
    </li>
  )
}
