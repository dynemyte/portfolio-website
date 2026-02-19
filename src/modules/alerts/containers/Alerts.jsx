import { Heading, Box } from '@chakra-ui/react';
import { alerts as alertsData } from '../../../data';

export default function Alerts() {
  return (
    <div>
      <Heading as="h1" size="xl">Alerts Page</Heading>
      <Box mt={6} p={5} bg="gray.50" borderRadius="md">
        <Heading as="h2" size="lg" mb={4}>Alerts Data (JSON)</Heading>
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
          {JSON.stringify(alertsData, null, 2)}
        </Box>
      </Box>
    </div>
  );
}
