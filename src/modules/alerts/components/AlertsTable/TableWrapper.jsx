import { Box } from '@chakra-ui/react';

export const TableWrapper = ({ children }) => (
  <Box
    bg="gray.50"
    border="1px solid"
    borderColor="gray.200"
    borderRadius="xl"
    overflow="hidden"
  >
    {children}
  </Box>
);
