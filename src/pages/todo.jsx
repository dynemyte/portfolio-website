import Todo from '../modules/todo/containers/Todo'
import { Box } from '@chakra-ui/react'

export default function TodoPage() {
  return (
    <Box maxWidth="600px" mx="left-margin" mt={8}>
      <Todo />
    </Box>
  )
}
