import { useState } from 'react'
import TodoItem from '../components/TodoItem'
import { Heading, VStack, HStack, Input, Button, Text, Spinner } from '@chakra-ui/react'
import useTodos from '../hooks/useTodos'

export default function Todo() {
  const { todos, toggleTodo, deleteTodo, isLoading, error } = useTodos()

  const [searchTerm, setSearchTerm] = useState('')

  const normalizedSearchTerm = searchTerm.toLowerCase()

  const filteredTodos = (Array.isArray(todos) ? todos : [])
    .filter(todo => todo && typeof todo === 'object')
    .filter(todo =>
      String(todo?.text ?? '')
        .toLowerCase()
        .includes(normalizedSearchTerm)
    )
    .sort(
      (firstTodo, secondTodo) =>
        Number(Boolean(firstTodo?.completed)) - Number(Boolean(secondTodo?.completed))
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

      {error ? (
        <Text color="red.400" mb={4}>
          Failed to load tasks
        </Text>
      ) : null}

      {isLoading ? (
        <Spinner />
      ) : (
        <VStack spacing={3} align="stretch">
          {filteredTodos.map((todo, todoIndex) => (
            <TodoItem
              key={todo.id ?? `${todo.createdAt}-${todoIndex}`}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
          {!filteredTodos.length ? <Text color="gray.500">No tasks yet.</Text> : null}
        </VStack>
      )}
    </div>
  )
}
