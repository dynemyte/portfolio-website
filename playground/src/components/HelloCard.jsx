import { Card } from '@chakra-ui/react'

export default function HelloCard(props) {
  return (
    <Card.Root
      borderRadius="12px"
      borderColor="blackAlpha.200"
      bg="white"
      boxShadow="none"
    >
      <Card.Body px="1.1rem" py="0.8rem" fontSize="1.1rem" fontWeight="500">
        {props.children}
      </Card.Body>
    </Card.Root>
  )
}
