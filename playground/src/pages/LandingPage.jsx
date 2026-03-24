import { Box, Flex, Text } from '@chakra-ui/react'
import ReferenceHeading from '../components/ReferenceHeading'
import Card from '../components/Card'
import SyncIcon from '../components/SyncIcon'
import SpinAnimation from '../components/SpinAnimation'
import ScrollTriggerAnimation from '../components/ScrollTriggerAnimation'

export default function LandingPage() {
  return (
    <Box as="main" minH="220vh" p="2rem" display="flex" justifyContent="center">
      <Box as="section" w="100%" maxW="960px">
        <Flex
          minH="100vh"
          alignItems="center"
          justifyContent="space-between"
          gap="1.5rem"
        >
          <Box
            display="flex"
            alignItems="center"
            minH="100vh"
            transform="translateY(-0.35rem)"
          >
            <Box>
              <ReferenceHeading />
              <Text
                mt="0.8rem"
                fontSize="clamp(1rem, 2.2vw, 1.35rem)"
                color="blackAlpha.800"
              >
                the only design system you should be thinking about
              </Text>
            </Box>
          </Box>

          <SpinAnimation
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="transparent"
            flexShrink={0}
            mt="0"
            transform="translateY(-0.35rem)"
          >
            <SyncIcon />
          </SpinAnimation>
        </Flex>

        <ScrollTriggerAnimation
          mt="14vh"
          display="inline-block"
          start="top 85%"
          once={false}
        >
          <Card>
            <h1 style={{ margin: 0, fontSize: '2.15rem', lineHeight: 1.05 }}>Hello</h1>
          </Card>
        </ScrollTriggerAnimation>
      </Box>
    </Box>
  )
}
