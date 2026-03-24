import { Card as ChakraCard } from '@chakra-ui/react'

export default function Card(props) {
  return (
    <ChakraCard.Root
      borderRadius="12px"
      borderColor="blackAlpha.200"
      bg="white"
      boxShadow="none"
      w="clamp(18rem, 40vw, 26rem)"
      minH="8.5rem"
    >
      <ChakraCard.Body
        px="1.5rem"
        py="1.1rem"
        fontSize="1.2rem"
        fontWeight="500"
        display="flex"
        alignItems="center"
      >
        {props.children}
      </ChakraCard.Body>
    </ChakraCard.Root>
  )
}
