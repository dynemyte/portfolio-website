import { useState, useEffect } from 'react'
import TodoItem from '../components/TodoItem'
import { Heading, VStack } from '@chakra-ui/react'
import { listTodos, seedTodos } from '../data/todoRepository'

export default function Todo() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    async function load() {
      try {
        await seedTodos()
        const data = await listTodos()

        setTodos(data)
      } catch (error) {
        console.error('Failed to load todos from RxDB', error)
      }
    }

    load()
  }, [])

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
