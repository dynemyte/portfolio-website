import { useLayoutEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollTriggerAnimation({
  children,
  fromY = 36,
  duration = 0.8,
  delay = 0.15,
  ease = 'power2.out',
  start = 'top 80%',
  end = 'bottom top',
  scrub = false,
  once = true,
  toggleActions = 'play none none reverse',
  markers = false,
  triggerRef,
  ...boxProps
}) {
  const containerRef = useRef(null)

  useLayoutEffect(() => {
    const containerElement = containerRef.current
    const triggerElement = triggerRef?.current || containerElement

    if (!containerElement || !triggerElement) {
      return undefined
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        containerElement,
        { y: fromY, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease,
          immediateRender: true,
          scrollTrigger: {
            trigger: triggerElement,
            start,
            end,
            scrub,
            once,
            toggleActions,
            markers,
            invalidateOnRefresh: true,
          },
        }
      )
    }, containerElement)

    ScrollTrigger.refresh()

    return () => {
      context.revert()
    }
  }, [
    fromY,
    duration,
    delay,
    ease,
    start,
    end,
    scrub,
    once,
    toggleActions,
    markers,
    triggerRef,
  ])

  return (
    <Box ref={containerRef} {...boxProps}>
      {children}
    </Box>
  )
}
