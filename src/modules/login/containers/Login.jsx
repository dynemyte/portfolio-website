import { Container, Heading } from '@chakra-ui/react';

export default function Login() {
  return (
    <Container maxW="lg" py={{ base: 12, md: 24 }}>
      <Heading as="h1" size="2xl">Login Page</Heading>
    </Container>
  );
}
