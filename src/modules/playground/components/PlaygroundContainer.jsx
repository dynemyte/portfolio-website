import { Box, Container, Heading, Text } from '@chakra-ui/react'
import RollingShapeTrack from './RollingShapeTrack'
import WigglyStarTrack from './WigglyStarTrack'

export default function PlaygroundContainer() {
  return (
    <Container maxW="6xl" py={{ base: 6, md: 8 }}>
      <Heading as="h1" size="xl">
        Playground
      </Heading>

      <Box mt={6}>
        <Text color="gray.600">GSAP animation playground ready.</Text>
      </Box>

      <Box mt={8}>
        <RollingShapeTrack />
      </Box>

      <Box mt={4}>
        <WigglyStarTrack />
      </Box>
    </Container>
  )
}
