import { Box, Text } from '@chakra-ui/react'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

const CIRCLE_SIZE = 72
const INTERACTION_RADIUS = 140
const PUSH_DISTANCE = 42

const CIRCLES = [
  { id: 'alpha', x: 24, y: 40, bg: 'teal.400' },
  { id: 'bravo', x: 132, y: 120, bg: 'purple.400' },
  { id: 'charlie', x: 268, y: 54, bg: 'orange.400' },
  { id: 'delta', x: 384, y: 128, bg: 'pink.400' },
  { id: 'echo', x: 520, y: 70, bg: 'cyan.500' },
]

function getCenter(element) {
  return {
    x: Number(gsap.getProperty(element, 'x')) + CIRCLE_SIZE / 2,
    y: Number(gsap.getProperty(element, 'y')) + CIRCLE_SIZE / 2,
  }
}

export default function DraggableShapeSandbox() {
  const areaRef = useRef(null)
  const circleRefs = useRef([])

  useLayoutEffect(() => {
    if (!areaRef.current) {
      return
    }

    const areaElement = areaRef.current
    const circleElements = circleRefs.current.filter(Boolean)

    if (!circleElements.length) {
      return
    }

    const context = gsap.context(() => {
      const getMaxX = () =>
        Math.max(areaElement.getBoundingClientRect().width - CIRCLE_SIZE, 0)
      const getMaxY = () =>
        Math.max(areaElement.getBoundingClientRect().height - CIRCLE_SIZE, 0)

      const clampWithinBounds = (element) => {
        const nextX = gsap.utils.clamp(
          0,
          getMaxX(),
          Number(gsap.getProperty(element, 'x')),
        )
        const nextY = gsap.utils.clamp(
          0,
          getMaxY(),
          Number(gsap.getProperty(element, 'y')),
        )

        gsap.set(element, {
          x: nextX,
          y: nextY,
        })
      }

      gsap.set(circleElements, {
        x: (index) => CIRCLES[index].x,
        y: (index) => CIRCLES[index].y,
        scale: 1,
      })

      circleElements.forEach((circle) => clampWithinBounds(circle))

      const nudgeNeighbors = (activeCircle) => {
        const activeCenter = getCenter(activeCircle)

        circleElements.forEach((circle) => {
          if (circle === activeCircle) {
            return
          }

          const circleCenter = getCenter(circle)
          const dx = circleCenter.x - activeCenter.x
          const dy = circleCenter.y - activeCenter.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance >= INTERACTION_RADIUS || distance === 0) {
            gsap.to(circle, {
              scale: 1,
              duration: 0.2,
              ease: 'power1.out',
              overwrite: false,
            })
            return
          }

          const strength = (1 - distance / INTERACTION_RADIUS) * PUSH_DISTANCE
          const angle = Math.atan2(dy, dx)

          const currentX = Number(gsap.getProperty(circle, 'x'))
          const currentY = Number(gsap.getProperty(circle, 'y'))

          const nextX = gsap.utils.clamp(
            0,
            getMaxX(),
            currentX + Math.cos(angle) * strength,
          )
          const nextY = gsap.utils.clamp(
            0,
            getMaxY(),
            currentY + Math.sin(angle) * strength,
          )

          gsap.to(circle, {
            x: nextX,
            y: nextY,
            scale: 1.08,
            duration: 0.18,
            ease: 'power2.out',
            overwrite: true,
          })
        })
      }

      const draggables = Draggable.create(circleElements, {
        type: 'x,y',
        bounds: areaElement,
        edgeResistance: 0.9,
        onPress() {
          gsap.to(this.target, {
            scale: 1.12,
            duration: 0.12,
            ease: 'power2.out',
            overwrite: true,
          })
        },
        onDrag() {
          nudgeNeighbors(this.target)
        },
        onRelease() {
          clampWithinBounds(this.target)
          gsap.to(this.target, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out',
            overwrite: true,
          })
        },
      })

      const handleResize = () => {
        circleElements.forEach((circle) => clampWithinBounds(circle))
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        draggables.forEach((instance) => instance.kill())
      }
    }, areaRef)

    return () => context.revert()
  }, [])

  return (
    <Box py={4}>
      <Text fontWeight="medium" mb={3}>
        Drag circles to nudge nearby circles.
      </Text>

      <Box
        ref={areaRef}
        position="relative"
        w="100%"
        h={{ base: '16rem', md: '20rem' }}
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="xl"
        bg="gray.50"
        overflow="hidden"
      >
        {CIRCLES.map((circle, index) => (
          <Box
            key={circle.id}
            ref={(element) => {
              circleRefs.current[index] = element
            }}
            position="absolute"
            w={`${CIRCLE_SIZE}px`}
            h={`${CIRCLE_SIZE}px`}
            borderRadius="full"
            bg={circle.bg}
            boxShadow="sm"
            cursor="grab"
            touchAction="none"
          />
        ))}
      </Box>
    </Box>
  )
}
