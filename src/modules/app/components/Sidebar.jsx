import { Link as RouterLink } from 'react-router-dom';
import { Box, VStack, Button } from '@chakra-ui/react';

export default function Sidebar() {
  return (
    <Box
      as="nav"
      position="fixed"
      left={0}
      top={0}
      h="100vh"
      w="250px"
      bg="gray.100"
      borderRightWidth="1px"
      borderRightColor="gray.200"
      py={4}
      px={2}
    >
      <VStack spacing={2} align="stretch">
        <Button as={RouterLink} to="/app" variant="ghost" justifyContent="flex-start">
          Dashboard
        </Button>
        <Button as={RouterLink} to="/app/alerts" variant="ghost" justifyContent="flex-start">
          Alerts
        </Button>
        <Button as={RouterLink} to="/app/operations" variant="ghost" justifyContent="flex-start">
          Operations
        </Button>
        <Button as={RouterLink} to="/app/operatives" variant="ghost" justifyContent="flex-start">
          Operatives
        </Button>
      </VStack>
    </Box>
  );
}
