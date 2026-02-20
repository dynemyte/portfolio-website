import { Stack } from '@chakra-ui/react';
import { OperationRow } from './OperationRow';
import { TableHeader } from './TableHeader';
import { TableWrapper } from './TableWrapper';

export const OperationsTable = ({ operations }) => (
  <TableWrapper>
    <TableHeader />
    <Stack gap={3} p={4}>
      {operations.map((operation) => (
        <OperationRow key={operation.id} operation={operation} />
      ))}
    </Stack>
  </TableWrapper>
);
