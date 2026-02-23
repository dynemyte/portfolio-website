import { Avatar, Button, Card, SimpleGrid } from '@chakra-ui/react'
import { operatives } from '../../../data'

export const OperativesGrid = ({ operatives }) => {
  console.log('my operatives', operatives)
  return (
    <div>
      <h1>Operatives</h1>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing="6" rowGap="6" p="4">
        {operatives.map(operative => (
          <Card.Root key={operative.id} width="350px">
            <Card.Body gap="2">
              <Avatar.Root size="lg" shape="rounded">
                <Avatar.Image src={operative.avatarUrl} />
                <Avatar.Fallback name={operative.codename} />
              </Avatar.Root>
              <Card.Title mt="2">{operative.codename}</Card.Title>
              <Card.Description>{operative.profile}</Card.Description>
            </Card.Body>
          </Card.Root>
        ))}
      </SimpleGrid>
    </div>
  )
}
