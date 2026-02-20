import { Heading, Stack } from '@chakra-ui/react';
import { operations as operationsData } from '../../../data';
import { OperationsTable } from '../components';

export default function Operations() {
  return (
    <Stack gap={6}>
      <Heading as="h1" size="xl">Operations</Heading>
      <OperationsTable operations={operationsData} />
    </Stack>
  );
}
