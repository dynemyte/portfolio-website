import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

export default function HeroSection({ imageAlt, imageSrc }) {
  const firstLine = 'You were not\nlooking for this...'

  const sectionRef = useRef(null)
  const firstLineRef = useRef(null)
  const secondLineRef = useRef(null)

  useEffect(() => {
    const sectionElement = sectionRef.current

    if (!sectionElement) {
      return undefined
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } })

      timeline.fromTo(
        firstLineRef.current,
        { autoAlpha: 0, y: -26 },
        { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out' }
      )

      timeline.fromTo(
        secondLineRef.current,
        { autoAlpha: 0, x: 20, y: 18 },
        { autoAlpha: 1, x: 0, y: 0, duration: 0.75, ease: 'power3.out' },
        '+=0.08'
      )
    }, sectionElement)

    return () => {
      context.revert()
    }
  }, [])

  return (
    <Box
      as="section"
      ref={sectionRef}
      w="100%"
      minH="100vh"
      fontFamily="'Neucha', cursive"
      backgroundImage={imageSrc ? `url(${imageSrc})` : undefined}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      position="relative"
      role="img"
      aria-label={imageAlt || ''}
    >
      <Box
        position="absolute"
        inset="0"
        bgGradient="linear(to-b, blackAlpha.200, blackAlpha.100)"
        pointerEvents="none"
      />

      <Flex
        as="nav"
        justify="flex-end"
        align="center"
        position="relative"
        zIndex="1"
        w="full"
        bg="#1B1523"
        minH={{ base: 10, md: 12 }}
        px={{ base: 6, md: 14, lg: 20 }}
      >
        <HStack
          gap={{ base: 3, md: 6 }}
          color="white"
          fontWeight="semibold"
          letterSpacing="0.08em"
          textTransform="uppercase"
          fontSize={{ base: 'xs', md: 'md' }}
        >
          <Text>Home</Text>
          <Text>Insight</Text>
          <Text>Services</Text>
          <Text>Contact</Text>
        </HStack>
      </Flex>

      <Flex
        position="relative"
        zIndex="1"
        direction="column"
        minH="calc(100vh - 48px)"
        px={{ base: 6, md: 14, lg: 20 }}
        pt={{ base: 24, md: 42, lg: 56 }}
        pb={{ base: 6, md: 8 }}
      >
        <Box
          ref={firstLineRef}
          maxW={{ base: '100%', md: '650px' }}
          ml={{ base: 3, md: 8, lg: 12 }}
          mt={{ base: 6, md: 10, lg: 12 }}
        >
          <Text
            whiteSpace="pre-line"
            color="gray.900"
            fontWeight="bold"
            fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
            lineHeight={{ base: '1.1', md: '1.02' }}
            letterSpacing="tight"
            minH={{ base: '140px', md: '210px' }}
          >
            {firstLine}
          </Text>
        </Box>

        <Flex flex="1" align="end" justify="end" pb={{ base: 10, md: 14 }}>
          <Box ref={secondLineRef} maxW={{ base: '75%', md: '420px' }}>
            <Text
              color="gray.900"
              fontWeight="bold"
              fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
              lineHeight="1.05"
              letterSpacing="tight"
              textAlign="left"
            >
              ...but it
              <br />
              found you
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}
