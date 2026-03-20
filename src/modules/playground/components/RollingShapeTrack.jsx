import { Box } from '@chakra-ui/react'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { getTravelDistance, playgroundMotion } from './playgroundMotion'

export default function RollingShapeTrack() {
  const trackRef = useRef(null)
  const circleRef = useRef(null)

  useLayoutEffect(() => {
    if (!trackRef.current || !circleRef.current) {
      return
    }

    const context = gsap.context(() => {
      gsap.set(circleRef.current, {
        x: 0,
        rotation: 0,
      })

      gsap.to(circleRef.current, {
        x: () => getTravelDistance(trackRef.current, circleRef.current),
        rotation: 1080,
        duration: playgroundMotion.square.duration,
        ease: 'elastic.inOut',
        repeat: -1,
        yoyo: true,
      })
    }, trackRef)

    return () => context.revert()
  }, [])

  return (
    <Box py={4}>
      <Box ref={trackRef} position="relative" w="100%" h="40" overflow="visible">
        <Box
          ref={circleRef}
          position="absolute"
          left="0"
          top="8"
          w="24"
          h="24"
          bg="blue.500"
          borderRadius="full"
        />
      </Box>
    </Box>
  )
}
