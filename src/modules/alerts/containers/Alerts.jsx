import { Heading, Box } from '@chakra-ui/react'
import { alerts as alertsData } from '../../../data'
import { AlertsTable } from '../components/AlertsTable'

export default function Alerts() {
  return (
    <div>
      <Heading as="h1" size="xl">
        Alerts Page
      </Heading>
      <Box mt={6} p={5} bg="gray.50" borderRadius="md">
        <Heading as="h2" size="lg" mb={4}>
          Alerts Data (JSON)
        </Heading>
        <AlertsTable alerts={alertsData} />
      </Box>
    </div>
  )
}
