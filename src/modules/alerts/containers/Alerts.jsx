import { Box, Text, VStack, Heading, Badge, HStack } from '@chakra-ui/react';
import alertsData from '../../../data/alerts.json';

export default function Alerts() {
  return (
    <VStack spacing={6} align="stretch">
      <Heading as="h1" size="xl">🚨 Alerts</Heading>
      <VStack spacing={3} align="stretch">
        {alertsData.map((alert) => (
          <Box
            key={alert.id}
            borderWidth="1px"
            borderRadius="md"
            p={4}
            bg="white"
            _dark={{ bg: 'gray.700' }}
            borderLeftWidth="4px"
            borderLeftColor={
              alert.severity === 'critical'
                ? 'red.500'
                : alert.severity === 'warning'
                ? 'orange.500'
                : 'blue.500'
            }
          >
            <HStack spacing={4} align="start">
              <Text fontSize="2xl">
                {alert.severity === 'critical' ? '🔴' : alert.severity === 'warning' ? '🟠' : '🔵'}
              </Text>
              <VStack align="start" spacing={2} flex={1}>
                <HStack justify="space-between" w="100%" flexWrap="wrap">
                  <Text fontWeight="bold">{alert.message}</Text>
                  <Badge
                    colorScheme={
                      alert.severity === 'critical'
                        ? 'red'
                        : alert.severity === 'warning'
                        ? 'orange'
                        : 'blue'
                    }
                  >
                    {alert.severity}
                  </Badge>
                </HStack>
                <HStack spacing={2} flexWrap="wrap">
                  <Badge variant="outline" colorScheme="purple">
                    {alert.type}
                  </Badge>
                  {alert.operationId && (
                    <Badge colorScheme="green">Op: {alert.operationId}</Badge>
                  )}
                  {alert.operativeId && (
                    <Badge colorScheme="blue">Opv: {alert.operativeId}</Badge>
                  )}
                </HStack>
                <HStack justify="space-between" w="100%" fontSize="sm" color="gray.500">
                  <Text>{new Date(alert.createdAt).toLocaleString()}</Text>
                  {alert.metadata && Object.keys(alert.metadata).length > 0 && (
                    <Text fontSize="xs" bg="gray.100" p={1} borderRadius="md">
                      📊 metadata
                    </Text>
                  )}
                </HStack>
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
}