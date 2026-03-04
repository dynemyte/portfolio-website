import { Card, HStack, Text, Checkbox } from '@chakra-ui/react'

export default function TodoItem({ todo, onToggle }) {
  return (
    <Card.Root
      borderColor="gray.300"
      borderWidth="1px"
      borderRadius="md"
      _hover={{ bg: 'gray.50' }}
      width="100%"
    >
      <Card.Body p={3}>
        <HStack
          gap={3}
          align="center"
          onClick={() => onToggle(todo.id)}
          //   If you later add a delete icon/button inside, it will also toggle. Fix later by adding a separate onClick handler for the delete button and calling event.stopPropagation() there.
          cursor="default"
          userSelect="none"
          transition="background-color 0.2s ease"
        >
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
        </HStack>
      </Card.Body>
    </Card.Root>
  )
}
