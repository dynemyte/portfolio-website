import { Link as RouterLink } from 'react-router-dom';
import { Container, Heading, Button, VStack } from '@chakra-ui/react';

export default function Landing() {
  return (
    <Container maxW="lg" py={{ base: 12, md: 24 }} px={{ base: 4, md: 8 }}>
      <VStack spacing={8} align="center">
        <Heading as="h1" size="2xl">Landing Page</Heading>
        <Button as={RouterLink} to="/app" colorScheme="blue" size="lg">
          Go to App
        </Button>
      </VStack>
    </Container>
  );
}
