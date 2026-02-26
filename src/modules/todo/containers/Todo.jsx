import React, { useState } from 'react'

export function Todo() {
  const [todos, todosSet] = React.useState([
    { id: 1, text: 'Check Operations', completed: false },
    { id: 2, text: 'Scan for vulnerabilities', completed: false },
    { id: 3, text: 'Check for updates on Operatives', completed: false },
  ])
}
