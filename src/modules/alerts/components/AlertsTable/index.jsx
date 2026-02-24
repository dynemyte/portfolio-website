import { Stack } from '@chakra-ui/react'
import { TableHeader } from './TableHeader'
import { TableWrapper } from './TableWrapper'
import { AlertsRow } from './AlertsRow'

export const AlertsTable = ({ alerts }) => (
  <TableWrapper>
    <TableHeader />
    <Stack gap={3} p={4}>
      {alerts.map(alert => (
        <AlertsRow key={alert.id} alert={alert} />
      ))}
    </Stack>
  </TableWrapper>
)
