import { Box } from '@chakra-ui/react'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { getTravelDistance, playgroundMotion } from './playgroundMotion'

export default function WigglyStarTrack() {
  const trackRef = useRef(null)
  const starRef = useRef(null)

  useLayoutEffect(() => {
    if (!trackRef.current || !starRef.current) {
      return
    }

    const context = gsap.context(() => {
      const setStarY = gsap.quickSetter(starRef.current, 'y', 'px')

      gsap.set(starRef.current, {
        x: 0,
        y: 0,
      })

      const maxX = getTravelDistance(trackRef.current, starRef.current)

      gsap.to(starRef.current, {
        x: maxX,
        duration: playgroundMotion.star.duration,
        ease: playgroundMotion.star.ease,
        repeat: -1,
        yoyo: true,
        onUpdate() {
          const currentX = gsap.getProperty(starRef.current, 'x')
          const normalizedX = currentX / maxX
          const waveY =
            Math.sin(normalizedX * Math.PI * 2 * playgroundMotion.star.waves) *
            playgroundMotion.star.amplitude

          setStarY(waveY)
        },
      })
    }, trackRef)

    return () => context.revert()
  }, [])

  return (
    <Box py={4}>
      <Box ref={trackRef} position="relative" w="100%" h="40" overflow="visible">
        <Box ref={starRef} position="absolute" left="0" top="10" w="20" h="20">
          <Box as="svg" viewBox="0 0 100 100" w="100%" h="100%" color="purple.500">
            <polygon
              points="50,7 61,36 92,36 67,55 76,88 50,69 24,88 33,55 8,36 39,36"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
