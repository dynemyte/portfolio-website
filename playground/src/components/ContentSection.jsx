import { Box } from '@chakra-ui/react'

export default function ContentSection({ children, ...boxProps }) {
  return (
    <Box as="section" w="100%" maxW="960px" {...boxProps}>
      {children}
    </Box>
  )
}
