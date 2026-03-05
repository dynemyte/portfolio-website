import { useEffect, useState } from 'react'
import TodoItem from '../components/TodoItem'
import { Heading, VStack } from '@chakra-ui/react'

const STORAGE_KEY = 'todo-app-todos'

export default function Todo() {
  const [todos, setTodos] = useState(() => {
    const defaultTodos = [
      { id: 1, text: 'Check Operations', completed: false },
      { id: 2, text: 'Scan for vulnerabilities', completed: false },
      { id: 3, text: 'Check for updates on Operatives', completed: false },
    ]

    const storedTodos = localStorage.getItem(STORAGE_KEY)
    if (!storedTodos) return defaultTodos

    try {
      const parsed = JSON.parse(storedTodos)
      return Array.isArray(parsed) ? parsed : defaultTodos
    } catch {
      return defaultTodos
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const toggleTodo = id => {
    setTodos(previousTodos =>
      previousTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const uncompleted = todos.filter(todo => !todo.completed)
  const completed = todos.filter(todo => todo.completed)
  const displayTodos = [...uncompleted, ...completed]

  return (
    <div>
      <Heading as="h2" size="lg" mb={4}>
        Tasks
      </Heading>

      <VStack spacing={3}>
        {displayTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} />
        ))}
      </VStack>
    </div>
  )
}
