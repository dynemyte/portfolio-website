import { useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import { gsap } from 'gsap'

export default function SlideUpAnimation({
  children,
  fromY = 36,
  duration = 0.8,
  delay = 0.15,
  ease = 'power2.out',
  ...boxProps
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const tween = gsap.fromTo(
      containerRef.current,
      { y: fromY, opacity: 0 },
      { y: 0, opacity: 1, duration, delay, ease }
    )

    return () => {
      tween.kill()
    }
  }, [fromY, duration, delay, ease])

  return (
    <Box ref={containerRef} {...boxProps}>
      {children}
    </Box>
  )
}
