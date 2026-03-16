import { Card, HStack, Text, Checkbox, IconButton } from '@chakra-ui/react'
import { HiArchiveBoxXMark } from 'react-icons/hi2'

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <Card.Root
      borderColor="gray.300"
      borderWidth="1px"
      borderRadius="md"
      _hover={{ bg: 'gray.50' }}
      width="100%"
      transition="all 0.5s ease"
      onClick={() => onToggle(todo.id)}
      cursor="default"
      userSelect="none"
    >
      <Card.Body p={3}>
        <HStack gap={3} align="center" transition="background-color 0.2s ease">
          <Checkbox.Root
            checked={todo.completed}
            onCheckedChange={e => {
              e.stopPropagation()
              onToggle(todo.id)
            }}
          >
            <Checkbox.Control />
            <Checkbox.HiddenInput />
          </Checkbox.Root>

          <Text flex="1">{todo.text}</Text>

          <IconButton
            aria-label="Archive task"
            variant="ghost"
            size="sm"
            onClick={e => {
              e.stopPropagation()
              onDelete(todo.id)
            }}
          >
            <HiArchiveBoxXMark />
          </IconButton>
        </HStack>
      </Card.Body>
    </Card.Root>
  )
}
