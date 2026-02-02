import { Link as RouterLink } from 'react-router-dom';
import { Heading, Button, VStack } from '@chakra-ui/react';

export default function Dashboard() {
  return (
    <VStack align="flex-start" spacing={4}>
      <Heading as="h1" size="xl">Dashboard</Heading>
      <Button as={RouterLink} to="/" colorScheme="red" variant="outline">
        Log out
      </Button>
    </VStack>
  );
}
