import { useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import { gsap } from 'gsap'

export default function SpinAnimation({
  children,
  duration = 1.8,
  repeat = -1,
  ease = 'none',
  ...boxProps
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const tween = gsap.to(containerRef.current, {
      rotate: 360,
      duration,
      repeat,
      ease,
    })

    return () => {
      tween.kill()
    }
  }, [duration, repeat, ease])

  return (
    <Box ref={containerRef} {...boxProps}>
      {children}
    </Box>
  )
}
