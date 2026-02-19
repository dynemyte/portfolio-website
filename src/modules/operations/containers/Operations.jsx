import { Heading, Box } from '@chakra-ui/react';
import { operations as operationsData } from '../../../data';

export default function Operations() {
  return (
    <div>
      <Heading as="h1" size="xl">Operations Page</Heading>
      <Box mt={6} p={5} bg="gray.50" borderRadius="md">
        <Heading as="h2" size="lg" mb={4}>Operations Data (JSON)</Heading>
        <Box 
          as="pre" 
          fontSize="xs" 
          whiteSpace="pre-wrap" 
          overflow="auto" 
          maxH="400px"
          bg="white"
          p={4}
          borderRadius="md"
          border="1px solid"
          borderColor="gray.200"
        >
          {JSON.stringify(operationsData, null, 2)}
        </Box>
      </Box>
    </div>
  );
}
