import { Box } from '@chakra-ui/react'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { getTravelDistance, playgroundMotion } from './playgroundMotion'

export default function RollingShapeTrack() {
  const trackRef = useRef(null)
  const shapeRef = useRef(null)

  useLayoutEffect(() => {
    if (!trackRef.current || !shapeRef.current) {
      return
    }

    const context = gsap.context(() => {
      gsap.set(shapeRef.current, {
        x: 0,
        rotation: 0,
        borderRadius: '0%',
      })

      gsap.to(shapeRef.current, {
        x: () => getTravelDistance(trackRef.current, shapeRef.current),
        rotation: playgroundMotion.square.rotation,
        duration: playgroundMotion.square.duration,
        ease: playgroundMotion.square.ease,
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
      })

      gsap.to(shapeRef.current, {
        borderRadius: '50%',
        duration: playgroundMotion.square.duration * 0.4,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
      })
    }, trackRef)

    return () => context.revert()
  }, [])

  return (
    <Box py={4}>
      <Box ref={trackRef} position="relative" w="100%" h="40" overflow="visible">
        <Box ref={shapeRef} position="absolute" left="0" top="8" w="24" h="24" bg="blue.500" />
      </Box>
    </Box>
  )
}
