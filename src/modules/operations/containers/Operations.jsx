import { Box, Text, VStack, Heading, Badge, HStack, SimpleGrid } from '@chakra-ui/react';
import operationsData from '../../../data/operations.json';

const priorityColor = {
  low: 'green',
  medium: 'yellow',
  high: 'orange',
  critical: 'red'
};

const statusColor = {
  draft: 'gray',
  planned: 'blue',
  active: 'green',
  completed: 'purple',
  failed: 'red',
  cancelled: 'gray'
};

export default function Operations() {
  return (
    <VStack spacing={6} align="stretch">
      <Heading as="h1" size="xl">📋 Operations</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {operationsData.map((op) => (
          <Box
            key={op.id}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            boxShadow="md"
            bg="white"
            _dark={{ bg: 'gray.700' }}
          >
            <HStack justify="space-between">
              <Heading as="h3" size="md">{op.title}</Heading>
              <Badge colorScheme={priorityColor[op.priority] || 'gray'}>
                {op.priority}
              </Badge>
            </HStack>
            <Text mt={2}>{op.briefing}</Text>
            <HStack mt={3} spacing={4}>
              <Badge colorScheme={statusColor[op.status] || 'gray'}>
                {op.status}
              </Badge>
              {op.location && (
                <Badge variant="outline">📍 {op.location}</Badge>
              )}
            </HStack>
            <Text fontSize="sm" mt={2}>
              {new Date(op.startAt).toLocaleString()} – {new Date(op.endAt).toLocaleTimeString()}
            </Text>
            <Text fontSize="sm" mt={2}>
              Assigned operatives: {op.assignedOperatives?.join(', ') || 'None'}
            </Text>
            {op.difficulty && (
              <Text fontSize="xs" color="gray.500" mt={1}>
                Difficulty: {op.difficulty}/5
              </Text>
            )}
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
}