import React from 'react'

const Note = ({ note, toggleImportantce }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li className='note'>
      <span>{note.content}</span>
      <button onClick={toggleImportantce}>{label}</button>
    </li>
  )
}

export default Note