import { Stack } from '@chakra-ui/react'
import { TableHeader } from './TableHeader'
import { TableWrapper } from './TableWrapper'

export const AlertsTable = ({ children }) => (
  <TableWrapper>
    <TableHeader />
    <Stack gap={3} p={4}>
      {children}
    </Stack>
  </TableWrapper>
)
