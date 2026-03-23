import { Box } from '@chakra-ui/react'

export default function HeroSection({ imageAlt, imageSrc }) {
  return (
    <Box
      as="section"
      w="100%"
      minH="100vh"
      backgroundImage={imageSrc ? `url(${imageSrc})` : undefined}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      role="img"
      aria-label={imageAlt || ''}
    />
  )
}
