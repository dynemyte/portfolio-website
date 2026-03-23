import { Container, Heading } from '@chakra-ui/react'

export default function PlaygroundContainer() {
  return (
    <Container maxW="6xl" py={{ base: 6, md: 8 }}>
      <Heading as="h1" size="xl">
        Test Page Ready
      </Heading>
    </Container>
  )
}
