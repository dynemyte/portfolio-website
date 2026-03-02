import { Box, Card } from '@chakra-ui/react'

export default function TodoItem({ todo, onToggle }) {
  return (
    <Card.Root
      onClick={() => onToggle(todo.id)}
      cursor="pointer"
      userSelect="none"
      _hover={{ bg: 'gray.50' }}
      transition="0.2s"
      borderRadius="md"
    >
      <Card.Body>
        {todo.completed ? '✓ ' : '○ '}
        {todo.text}
      </Card.Body>
    </Card.Root>
  )
}
