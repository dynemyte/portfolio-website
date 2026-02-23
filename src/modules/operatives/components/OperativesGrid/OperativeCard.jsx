import { Avatar, Button, Card, SimpleGrid } from '@chakra-ui/react'

export default function OperativeCard(props) {
  console.log('This is the props i supplied to this component', props)

  const { avatarUrl, codename, profile } = props

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
    </Card.Root>
  )
}
