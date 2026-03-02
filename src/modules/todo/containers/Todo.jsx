import React, { useState } from 'react'
import TodoItem from '../components/TodoItem'
import { Heading } from '@chakra-ui/react'

export default function Todo() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: 'Check Operations', completed: false },
    { id: 2, text: 'Scan for vulnerabilities', completed: false },
    { id: 3, text: 'Check for updates on Operatives', completed: false },
  ])

  const toggleTodo = id => {
    setTodos(previousTodos => {
      return previousTodos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }

        return todo
      })
    })
  }

  return (
    <div>
      <Heading as="h2" size="lg" mb={4}>
        Tasks
      </Heading>

      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} />
      ))}
    </div>
  )
}
