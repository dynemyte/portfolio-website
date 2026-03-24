import { Heading } from '@chakra-ui/react'

export default function HeroHeading() {
  return (
    <Heading
      m={0}
      fontSize="clamp(2.3rem, 7.4vw, 5.5rem)"
      fontWeight="800"
      lineHeight="1"
    >
      Reference UI
    </Heading>
  )
}
