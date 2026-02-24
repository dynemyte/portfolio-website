import { HStack, Text } from '@chakra-ui/react'

const COLUMNS = [
  { label: 'Type', flex: '1' },
  { label: 'Message', flex: '3' },
  { label: 'Severity', flex: '1' },
  { label: 'Created', flex: '1', textAlign: 'right' },
]

export const TableHeader = () => {
  return (
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
      {COLUMNS.map(({ label, flex, textAlign }) => (
        <Text key={label} flex={flex} textAlign={textAlign}>
          {label}
        </Text>
      ))}
    </HStack>
  )
}
