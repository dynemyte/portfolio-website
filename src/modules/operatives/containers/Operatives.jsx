import {
  Box, Image, Text, VStack, Heading, Badge, HStack, SimpleGrid
  // Progress removed temporarily
} from '@chakra-ui/react';
import operativesData from '../../../data/operatives.json';
import rolesData from '../../../data/roles.json';

const getRoleTitle = (roleId) => {
  const role = rolesData.find(r => r.id === roleId);
  return role ? role.title : roleId;
};

export default function Operatives() {
  return (
    <VStack spacing={6} align="stretch">
      <Heading as="h1" size="xl">🐱 Operatives</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {operativesData.map((op) => (
          <Box
            key={op.id}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            boxShadow="md"
            bg="white"
            _dark={{ bg: 'gray.700' }}
          >
            <HStack spacing={4}>
              <Image
                src={op.avatarUrl}
                alt={op.codename}
                borderRadius="full"
                boxSize="60px"
                objectFit="cover"
              />
              <VStack align="start" spacing={1}>
                <Heading as="h3" size="md">{op.codename}</Heading>
                <Badge
                  colorScheme={
                    op.status === 'available' ? 'green' :
                    op.status === 'deployed' ? 'orange' : 'gray'
                  }
                >
                  {op.status}
                </Badge>
              </VStack>
            </HStack>

            <Text mt={3}>{op.bio}</Text>
            <Text fontSize="sm" color="gray.500">Quirks: {op.quirks}</Text>

            {/* Temporarily replace Progress with simple text */}
            <HStack mt={3} spacing={4}>
              <Box flex={1}>
                <Text fontSize="xs">Health: {op.health}%</Text>
              </Box>
              <Box flex={1}>
                <Text fontSize="xs">Energy: {op.energy}%</Text>
              </Box>
            </HStack>

            <HStack mt={3} spacing={2} flexWrap="wrap">
              {op.specialties.map((specId) => (
                <Badge key={specId} variant="subtle" colorScheme="purple">
                  {getRoleTitle(specId)}
                </Badge>
              ))}
            </HStack>

            {op.currentOperationId && (
              <Text fontSize="sm" mt={2}>
                On mission: {op.currentOperationId}
              </Text>
            )}
            <Text fontSize="xs" color="gray.400" mt={1}>
              Last seen: {new Date(op.lastSeenAt).toLocaleString()}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
}