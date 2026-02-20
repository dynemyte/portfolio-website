import { HStack } from '@chakra-ui/react';

export const RowCard = ({ children }) => (
  <HStack
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
    {children}
  </HStack>
);
