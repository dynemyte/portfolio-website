import { Avatar, Button, Card, SimpleGrid } from '@chakra-ui/react'
import OperativeCard from './OperativeCard'

export const OperativesGrid = ({ operatives }) => {
  console.log('my operatives', operatives)
  return (
    <div>
      <h1>Operatives</h1>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing="6" rowGap="6" p="4">
        {operatives.map(operative => (
          <OperativeCard
            colorPalette="pink"
            codename={operative.codename}
            avatarUrl={operative.avatarUrl}
            profile={operative.profile}
            status={operative.status}
          />
        ))}
      </SimpleGrid>
    </div>
  )
}
