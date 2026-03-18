import { Box, Container, Heading, Text } from '@chakra-ui/react'

export default function PlaygroundContainer() {
  return (
    <Container maxW="4xl" py={{ base: 6, md: 8 }}>
      <Heading as="h1" size="xl">
        Playground
      </Heading>
      <Box mt={6} p={6} borderWidth="1px" borderRadius="md">
        <Text color="gray.600">GSAP animation playground ready.</Text>
      </Box>
    </Container>
  )
}
