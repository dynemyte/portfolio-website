import { Box, Flex } from '@chakra-ui/react'
import ReferenceHeading from '../components/ReferenceHeading'
import HelloCard from '../components/HelloCard'
import SyncIcon from '../components/SyncIcon'
import SpinAnimation from '../components/SpinAnimation'
import SlideUpAnimation from '../components/SlideUpAnimation'

export default function LandingPage() {
  return (
    <Box
      as="main"
      minH="100vh"
      p="2rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box as="section" w="100%" maxW="960px">
        <Flex alignItems="flex-start" justifyContent="space-between" gap="1.5rem">
          <Box>
            <ReferenceHeading />
            <SlideUpAnimation mt="1rem" display="inline-block">
              <HelloCard>
                <h1>Hello</h1>
              </HelloCard>
            </SlideUpAnimation>
          </Box>

          <SpinAnimation
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="transparent"
            flexShrink={0}
            mt="0.4rem"
          >
            <SyncIcon />
          </SpinAnimation>
        </Flex>
      </Box>
    </Box>
  )
}
