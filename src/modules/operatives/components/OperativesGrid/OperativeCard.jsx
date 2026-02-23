import { Avatar, Button, Card, SimpleGrid, Tag } from '@chakra-ui/react'

export default function OperativeCard(props) {

const { avatarUrl, codename, profile, status } = props
const tagColor = StatusPalette[status] ?? "gray"
  
  return (
    <Card.Root width="350px">
      <Card.Body gap="2">
        <Avatar.Root size="lg" shape="rounded">
          <Avatar.Image src={avatarUrl} />
          <Avatar.Fallback name={codename} />
        </Avatar.Root>
        <Card.Title mt="2">{codename}</Card.Title>
        <Card.Description>{profile}</Card.Description>
      </Card.Body>
      <Card.Footer>
        <Tag.Root size="sm" colorPalette={tagColor}>
          <Tag.Label>{status}</Tag.Label>
        </Tag.Root>
      </Card.Footer>
    </Card.Root>
  )
}


const StatusPalette = {
  available: "green",
  offline: "gray",
  deployed: "orange",
  recovering: "blue"
}