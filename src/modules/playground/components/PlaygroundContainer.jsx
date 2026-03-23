import { Box } from '@chakra-ui/react'
import HeroSection from './HeroSection'
import heroImage from '../../../assets/images/MysticalCat.png'

export default function PlaygroundContainer() {
  return (
    <Box mx="-8" my="-8">
      <HeroSection imageSrc={heroImage} imageAlt="Landing page hero artwork" />
    </Box>
  )
}
