import { Box, Text } from '@chakra-ui/react'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/all'

gsap.registerPlugin(Draggable)

const CIRCLE_SIZE = 72
const COLLISION_DISTANCE = CIRCLE_SIZE
const PHYSICS_SUBSTEPS = 2
const BOUNCE_RESTITUTION = 0.9
const VELOCITY_DAMPING = 0.985
const MAX_SPEED = 28
const STOP_SPEED = 0.03
const DRAG_VELOCITY_SCALE = 0.9

const CIRCLES = [
  { id: 'alpha', x: 24, y: 40, bg: 'teal.400' },
  { id: 'bravo', x: 132, y: 120, bg: 'purple.400' },
  { id: 'charlie', x: 268, y: 54, bg: 'orange.400' },
  { id: 'delta', x: 384, y: 128, bg: 'pink.400' },
  { id: 'echo', x: 520, y: 70, bg: 'cyan.500' },
]

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

      const clamp = (value, min, max) => gsap.utils.clamp(min, max, value)

      const bodies = circleElements.map((element, index) => {
        const initialX = clamp(CIRCLES[index].x, 0, getMaxX())
        const initialY = clamp(CIRCLES[index].y, 0, getMaxY())

        gsap.set(element, {
          x: initialX,
          y: initialY,
          scale: 1,
          zIndex: 1,
        })

        return {
          element,
          x: initialX,
          y: initialY,
          vx: 0,
          vy: 0,
          isDragging: false,
          lastX: initialX,
          lastY: initialY,
          lastTimestamp: 0,
        }
      })

      const bodyByElement = new Map(bodies.map(body => [body.element, body]))

      const limitSpeed = body => {
        const speed = Math.sqrt(body.vx * body.vx + body.vy * body.vy)

        if (speed <= MAX_SPEED || speed === 0) {
          return
        }

        const scale = MAX_SPEED / speed
        body.vx *= scale
        body.vy *= scale
      }

      const applyWallBounce = body => {
        const maxX = getMaxX()
        const maxY = getMaxY()

        if (body.x < 0) {
          body.x = 0
          if (body.vx < 0) {
            body.vx = -body.vx * BOUNCE_RESTITUTION
          }
        }

        if (body.x > maxX) {
          body.x = maxX
          if (body.vx > 0) {
            body.vx = -body.vx * BOUNCE_RESTITUTION
          }
        }

        if (body.y < 0) {
          body.y = 0
          if (body.vy < 0) {
            body.vy = -body.vy * BOUNCE_RESTITUTION
          }
        }

        if (body.y > maxY) {
          body.y = maxY
          if (body.vy > 0) {
            body.vy = -body.vy * BOUNCE_RESTITUTION
          }
        }

        limitSpeed(body)
      }

      const renderBodies = () => {
        bodies.forEach(body => {
          gsap.set(body.element, {
            x: body.x,
            y: body.y,
          })
        })
      }

      const resolvePairCollision = (firstBody, secondBody) => {
        const dx = secondBody.x - firstBody.x
        const dy = secondBody.y - firstBody.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance >= COLLISION_DISTANCE) {
          return
        }

        const safeDistance = distance === 0 ? 0.0001 : distance
        const nx = dx / safeDistance
        const ny = dy / safeDistance
        const overlap = COLLISION_DISTANCE - safeDistance

        if (firstBody.isDragging && !secondBody.isDragging) {
          secondBody.x += nx * overlap
          secondBody.y += ny * overlap
        } else if (secondBody.isDragging && !firstBody.isDragging) {
          firstBody.x -= nx * overlap
          firstBody.y -= ny * overlap
        } else {
          const halfOverlap = overlap / 2
          firstBody.x -= nx * halfOverlap
          firstBody.y -= ny * halfOverlap
          secondBody.x += nx * halfOverlap
          secondBody.y += ny * halfOverlap
        }

        const relativeVelocityX = secondBody.vx - firstBody.vx
        const relativeVelocityY = secondBody.vy - firstBody.vy
        const velocityAlongNormal = relativeVelocityX * nx + relativeVelocityY * ny

        if (velocityAlongNormal > 0) {
          applyWallBounce(firstBody)
          applyWallBounce(secondBody)
          return
        }

        const impulseMagnitude = (-(1 + BOUNCE_RESTITUTION) * velocityAlongNormal) / 2
        const impulseX = impulseMagnitude * nx
        const impulseY = impulseMagnitude * ny

        if (!firstBody.isDragging) {
          firstBody.vx -= impulseX
          firstBody.vy -= impulseY
          limitSpeed(firstBody)
        }

        if (!secondBody.isDragging) {
          secondBody.vx += impulseX
          secondBody.vy += impulseY
          limitSpeed(secondBody)
        }

        applyWallBounce(firstBody)
        applyWallBounce(secondBody)
      }

      const resolveAllCollisions = () => {
        for (let firstIndex = 0; firstIndex < bodies.length; firstIndex += 1) {
          for (
            let secondIndex = firstIndex + 1;
            secondIndex < bodies.length;
            secondIndex += 1
          ) {
            resolvePairCollision(bodies[firstIndex], bodies[secondIndex])
          }
        }
      }

      const advanceBodies = frameRatio => {
        const damping = Math.pow(VELOCITY_DAMPING, frameRatio)

        bodies.forEach(body => {
          if (body.isDragging) {
            return
          }

          body.x += body.vx * frameRatio
          body.y += body.vy * frameRatio
          body.vx *= damping
          body.vy *= damping

          if (Math.abs(body.vx) < STOP_SPEED) {
            body.vx = 0
          }

          if (Math.abs(body.vy) < STOP_SPEED) {
            body.vy = 0
          }

          applyWallBounce(body)
        })
      }

      let lastTickTimestamp = performance.now()

      const runPhysicsStep = () => {
        const now = performance.now()
        const elapsed = Math.min(now - lastTickTimestamp, 48)
        lastTickTimestamp = now
        const frameRatio = Math.max(elapsed / 16.67, 0.5)
        const substepRatio = frameRatio / PHYSICS_SUBSTEPS

        for (let step = 0; step < PHYSICS_SUBSTEPS; step += 1) {
          advanceBodies(substepRatio)
          resolveAllCollisions()
        }

        renderBodies()
      }

      gsap.ticker.add(runPhysicsStep)

      const draggables = Draggable.create(circleElements, {
        type: 'x,y',
        bounds: areaElement,
        edgeResistance: 0.9,
        onPress() {
          const body = bodyByElement.get(this.target)

          if (!body) {
            return
          }

          body.isDragging = true
          body.vx = 0
          body.vy = 0
          body.lastX = body.x
          body.lastY = body.y
          body.lastTimestamp = performance.now()

          gsap.set(body.element, { zIndex: 2 })
          gsap.to(body.element, {
            scale: 1.12,
            duration: 0.12,
            ease: 'power2.out',
            overwrite: true,
          })
        },
        onDrag() {
          const body = bodyByElement.get(this.target)

          if (!body) {
            return
          }

          const now = performance.now()
          const elapsed = Math.max(now - body.lastTimestamp, 1)
          const nextX = Number(this.x)
          const nextY = Number(this.y)
          const frameScale = (16.67 / elapsed) * DRAG_VELOCITY_SCALE

          body.vx = (nextX - body.lastX) * frameScale
          body.vy = (nextY - body.lastY) * frameScale
          limitSpeed(body)

          body.x = nextX
          body.y = nextY
          body.lastX = nextX
          body.lastY = nextY
          body.lastTimestamp = now
          applyWallBounce(body)

          resolveAllCollisions()
          resolveAllCollisions()
          renderBodies()
        },
        onRelease() {
          const body = bodyByElement.get(this.target)

          if (!body) {
            return
          }

          body.isDragging = false
          body.lastTimestamp = 0

          gsap.set(body.element, { zIndex: 1 })
          gsap.to(body.element, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out',
            overwrite: true,
          })
        },
      })

      const handleResize = () => {
        bodies.forEach(body => {
          body.x = clamp(body.x, 0, getMaxX())
          body.y = clamp(body.y, 0, getMaxY())
          applyWallBounce(body)
        })

        resolveAllCollisions()
        renderBodies()
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
        Drag and fling circles. Collisions bounce and chain.
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
