import { Box } from '@chakra-ui/react';
import Sidebar from './Sidebar';

export default function AppLayout({ children }) {
  return (
    <Box display="flex" minH="100vh">
      <Sidebar />
      <Box ml="250px" flex={1} p={8}>
        {children}
      </Box>
    </Box>
  );
}
