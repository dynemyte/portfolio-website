import { Box, Tag, Text } from '@chakra-ui/react';
import { STATUS_PALETTE, PRIORITY_PALETTE } from '../../constants';

const formatLabel = (value) => value ? value.charAt(0).toUpperCase() + value.slice(1) : 'Unknown';

export const TitleCell = ({ title }) => (
  <Box flex="2">
    <Text fontWeight="semibold" color="gray.900">{title}</Text>
  </Box>
);

export const PriorityCell = ({ priority }) => {
  const label = formatLabel(priority);
  const colorPalette = PRIORITY_PALETTE[priority] || 'gray';
  
  return (
    <Box flex="1" display="flex" alignItems="center">
      <Tag.Root size="sm" variant="subtle" colorPalette={colorPalette}>
        <Tag.Label>{label}</Tag.Label>
      </Tag.Root>
    </Box>
  );
};

export const DifficultyCell = ({ difficulty }) => (
  <Box flex="1" display="flex" alignItems="center">
    <Text fontSize="sm" fontWeight="medium" color="gray.700">
      {formatLabel(difficulty)}
    </Text>
  </Box>
);

export const AlertsCell = ({ alerts }) => (
  <Box flex="1" display="flex" alignItems="center">
    <Tag.Root size="sm" variant="surface" colorPalette="purple">
      <Tag.Label>{alerts?.length ?? 0} Alerts</Tag.Label>
    </Tag.Root>
  </Box>
);

export const StatusCell = ({ status }) => {
  const label = formatLabel(status);
  const colorPalette = STATUS_PALETTE[status] || 'gray';
  
  return (
    <Box flex="1" display="flex" alignItems="center" justifyContent="flex-end">
      <Tag.Root size="sm" variant="subtle" colorPalette={colorPalette}>
        <Tag.Label>{label}</Tag.Label>
      </Tag.Root>
    </Box>
  );
};
