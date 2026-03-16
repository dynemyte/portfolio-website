import { useState, useEffect } from 'react'
import TodoItem from '../components/TodoItem'
import { Heading, VStack, HStack, Input, Button } from '@chakra-ui/react'
import {
  listTodos,
  seedTodos,
  createTodo,
  toggleTodo as toggleTodoInRepository,
  deleteTodo as deleteTodoInRepository,
} from '../data/todoRepository'

export default function Todo() {
  const [todos, setTodos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  async function refreshTodos() {
    const data = await listTodos()
    setTodos(data)
  }

  useEffect(() => {
    async function load() {
      try {
        await seedTodos()
        await refreshTodos()
      } catch (error) {
        console.error('Failed to load todos from RxDB', error)
      }
    }

    load()
  }, [])

  const addTodo = async text => {
    await createTodo(text)
    await refreshTodos()
  }

  const toggleTodo = async id => {
    await toggleTodoInRepository(id)
    await refreshTodos()
  }

  const deleteTodo = async id => {
    await deleteTodoInRepository(id)
    await refreshTodos()
  }

  const uncompleted = todos.filter(todo => !todo.completed)
  const completed = todos.filter(todo => todo.completed)
  const displayTodos = [...uncompleted, ...completed]
  const filteredTodos = displayTodos.filter(todo =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <Heading as="h2" size="lg" mb={4}>
        Tasks
      </Heading>

      <HStack justify="space-between" mb={4}>
        <Input
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Button>+ Add Task</Button>
      </HStack>

      <VStack spacing={3}>
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onAdd={addTodo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </VStack>
    </div>
  )
}
