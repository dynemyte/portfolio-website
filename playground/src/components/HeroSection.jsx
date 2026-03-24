import { Box, Flex, Text } from '@chakra-ui/react'
import HeroHeading from './HeroHeading'
import SyncIcon from './SyncIcon'
import SpinAnimation from './SpinAnimation'

export default function HeroSection({ subtitle }) {
  return (
    <Flex minH="100vh" alignItems="center" justifyContent="space-between" gap="1.5rem">
      <Box
        display="flex"
        alignItems="center"
        minH="100vh"
        transform="translateY(-0.35rem)"
      >
        <Box>
          <HeroHeading />
          <Text mt="0.8rem" fontSize="clamp(1rem, 2.2vw, 1.35rem)" color="blackAlpha.800">
            {subtitle}
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
  )
}
