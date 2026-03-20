import { Box, Text } from '@chakra-ui/react'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/all'

gsap.registerPlugin(Draggable)

const CIRCLE_SIZE = 72
const PRE_CONTACT_BUFFER = 10
const INTERACTION_RADIUS = CIRCLE_SIZE + PRE_CONTACT_BUFFER
const PUSH_DISTANCE = 10
const SOLVER_ITERATIONS = 8

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

      const clampPosition = (x, y) => ({
        x: gsap.utils.clamp(0, getMaxX(), x),
        y: gsap.utils.clamp(0, getMaxY(), y),
      })

      const getPosition = element => ({
        x: Number(gsap.getProperty(element, 'x')),
        y: Number(gsap.getProperty(element, 'y')),
      })

      const setPosition = (element, x, y) => {
        const clamped = clampPosition(x, y)

        gsap.set(element, {
          x: clamped.x,
          y: clamped.y,
        })
      }

      const clampWithinBounds = element => {
        const position = getPosition(element)
        setPosition(element, position.x, position.y)
      }

      const moveBy = (element, dx, dy) => {
        const position = getPosition(element)
        setPosition(element, position.x + dx, position.y + dy)
      }

      gsap.set(circleElements, {
        x: index => CIRCLES[index].x,
        y: index => CIRCLES[index].y,
        scale: 1,
      })

      circleElements.forEach(circle => clampWithinBounds(circle))

      const resolveOverlaps = activeCircle => {
        for (let iteration = 0; iteration < SOLVER_ITERATIONS; iteration += 1) {
          let hasOverlap = false

          for (let firstIndex = 0; firstIndex < circleElements.length; firstIndex += 1) {
            for (
              let secondIndex = firstIndex + 1;
              secondIndex < circleElements.length;
              secondIndex += 1
            ) {
              const firstCircle = circleElements[firstIndex]
              const secondCircle = circleElements[secondIndex]
              const firstCenter = getCenter(firstCircle)
              const secondCenter = getCenter(secondCircle)

              const dx = secondCenter.x - firstCenter.x
              const dy = secondCenter.y - firstCenter.y
              const distance = Math.sqrt(dx * dx + dy * dy)

              if (distance >= CIRCLE_SIZE) {
                continue
              }

              hasOverlap = true

              const overlap = CIRCLE_SIZE - distance
              const nx = distance > 0 ? dx / distance : 1
              const ny = distance > 0 ? dy / distance : 0

              let firstPush = overlap / 2
              let secondPush = overlap / 2

              if (firstCircle === activeCircle) {
                firstPush = 0
                secondPush = overlap
              }

              if (secondCircle === activeCircle) {
                firstPush = overlap
                secondPush = 0
              }

              moveBy(firstCircle, -nx * firstPush, -ny * firstPush)
              moveBy(secondCircle, nx * secondPush, ny * secondPush)
            }
          }

          circleElements.forEach(circle => clampWithinBounds(circle))

          if (!hasOverlap) {
            break
          }
        }
      }

      const nudgeNeighbors = activeCircle => {
        const activeCenter = getCenter(activeCircle)

        circleElements.forEach(circle => {
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
              duration: 0.12,
              ease: 'power1.out',
              overwrite: true,
            })
            return
          }

          const proximity = (INTERACTION_RADIUS - distance) / PRE_CONTACT_BUFFER
          const strength = proximity * PUSH_DISTANCE
          const nx = dx / distance
          const ny = dy / distance

          moveBy(circle, nx * strength, ny * strength)

          gsap.to(circle, {
            scale: 1.08,
            duration: 0.1,
            ease: 'power2.out',
            overwrite: true,
          })
        })
      }

      let activeCircle = null

      const runPhysicsStep = () => {
        if (!activeCircle) {
          return
        }

        nudgeNeighbors(activeCircle)
        resolveOverlaps(activeCircle)
      }

      gsap.ticker.add(runPhysicsStep)

      const draggables = Draggable.create(circleElements, {
        type: 'x,y',
        bounds: areaElement,
        edgeResistance: 0.9,
        onPress() {
          activeCircle = this.target
          gsap.set(this.target, { zIndex: 2 })
          gsap.to(this.target, {
            scale: 1.12,
            duration: 0.12,
            ease: 'power2.out',
            overwrite: true,
          })
        },
        onDrag() {
          runPhysicsStep()
        },
        onRelease() {
          activeCircle = null
          gsap.set(this.target, { zIndex: 1 })
          clampWithinBounds(this.target)
          resolveOverlaps(null)
          gsap.to(this.target, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out',
            overwrite: true,
          })
        },
      })

      const handleResize = () => {
        circleElements.forEach(circle => clampWithinBounds(circle))
        resolveOverlaps(null)
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        gsap.ticker.remove(runPhysicsStep)
        draggables.forEach(instance => instance.kill())
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
            ref={element => {
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
