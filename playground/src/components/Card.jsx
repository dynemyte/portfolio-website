import { Card as ChakraCard } from '@chakra-ui/react'

export default function Card(props) {
  return (
    <ChakraCard.Root
      borderRadius="12px"
      borderColor="blackAlpha.200"
      bg="white"
      boxShadow="none"
      w="100%"
      minH="10rem"
    >
      <ChakraCard.Body
        px="1.5rem"
        py="1.1rem"
        fontSize="1.2rem"
        fontWeight="500"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        {props.children}
      </ChakraCard.Body>
    </ChakraCard.Root>
  )
}
