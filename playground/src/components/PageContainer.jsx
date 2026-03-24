import { Box } from '@chakra-ui/react'

export default function PageContainer({ children, ...boxProps }) {
  return (
    <Box
      as="main"
      minH="220vh"
      p="2rem"
      display="flex"
      justifyContent="center"
      {...boxProps}
    >
      {children}
    </Box>
  )
}
