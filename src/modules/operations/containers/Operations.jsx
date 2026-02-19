import { Box, Heading, HStack, Stack, Tag, Text } from '@chakra-ui/react';
import { operations as operationsData } from '../../../data';

const statusPaletteMap = {
  completed: 'green',
  active: 'blue',
  planned: 'yellow',
  failed: 'red',
  cancelled: 'gray',
};

const priorityPaletteMap = {
  low: 'gray',
  medium: 'yellow',
  high: 'orange',
  critical: 'red',
};

const formatLabel = (value) => {
  if (!value) return 'Unknown';
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export default function Operations() {
  return (
    <Stack gap={6}>
      <Heading as="h1" size="xl">Operations</Heading>

      <Box
        bg="gray.50"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="xl"
        overflow="hidden"
      >
        <HStack
          px={6}
          py={4}
          bg="gray.100"
          borderBottom="1px solid"
          borderColor="gray.200"
          fontSize="sm"
          fontWeight="semibold"
          color="gray.600"
          justify="space-between"
        >
          <Text flex="2">Operation</Text>
          <Text flex="1">Priority</Text>
          <Text flex="1">Difficulty</Text>
          <Text flex="1">Alerts</Text>
          <Text flex="1" textAlign="right">Status</Text>
        </HStack>

        <Stack gap={3} p={4} bg="gray.50">
          {operationsData.map((operation) => {
            const statusPalette = statusPaletteMap[operation.status] || 'gray';
            const priorityPalette = priorityPaletteMap[operation.priority] || 'gray';
            const alertsCount = operation.alerts?.length ?? 0;
            const difficulty = operation.difficulty || 'Unknown';

            return (
              <HStack
                key={operation.id}
                px={5}
                py={4}
                bg="white"
                borderRadius="lg"
                border="1px solid"
                borderColor="gray.200"
                boxShadow="none"
                transition="box-shadow 0.2s ease, border-color 0.2s ease, transform 0.05s ease"
                cursor="pointer"
                _hover={{ boxShadow: 'md', borderColor: 'gray.300', transform: 'translateY(-2px)' }}
                align="center"
                justify="space-between"
              >
                <Box flex="2">
                  <Text fontWeight="semibold" color="gray.900">
                    {operation.title}
                  </Text>
                </Box>

                <Box flex="1" display="flex" alignItems="center">
                  <Tag.Root size="sm" variant="subtle" colorPalette={priorityPalette}>
                    <Tag.Label>{formatLabel(operation.priority)}</Tag.Label>
                  </Tag.Root>
                </Box>

                <Box flex="1">
                  <Text fontSize="sm" fontWeight="medium" color="gray.700">
                    {difficulty}
                  </Text>
                </Box>

                <Box flex="1" display="flex" alignItems="center">
                  <Tag.Root size="sm" variant="surface" colorPalette="purple">
                    <Tag.Label>{alertsCount} Alerts</Tag.Label>
                  </Tag.Root>
                </Box>

                <Box flex="1" display="flex" alignItems="center" justifyContent="flex-end">
                  <Tag.Root size="sm" variant="subtle" colorPalette={statusPalette}>
                    <Tag.Label>{formatLabel(operation.status)}</Tag.Label>
                  </Tag.Root>
                </Box>
              </HStack>
            );
          })}
        </Stack>
      </Box>
    </Stack>
  );
}
