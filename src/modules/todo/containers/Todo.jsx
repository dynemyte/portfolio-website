import React, { useState } from 'react'

export default function Todo() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: 'Check Operations', completed: false },
    { id: 2, text: 'Scan for vulnerabilities', completed: false },
    { id: 3, text: 'Check for updates on Operatives', completed: false },
  ])

  return (
    <div>
      <h2>Tasks</h2>

      {todos.map(todo => (
        <div key={todo.id}>{todo.text}</div>
      ))}
    </div>
  )
}
