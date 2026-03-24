import { SimpleGrid } from '@chakra-ui/react'
import Card from './Card'
import ScrollTriggerAnimation from './ScrollTriggerAnimation'

export default function MessageCardRows({ labels, start, mt }) {
  return (
    <ScrollTriggerAnimation mt={mt} start={start} once={false}>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="1.25rem">
        {labels.map(label => (
          <Card key={label}>
            <h1 style={{ margin: 0, fontSize: '2.15rem', lineHeight: 1.05 }}>{label}</h1>
          </Card>
        ))}
      </SimpleGrid>
    </ScrollTriggerAnimation>
  )
}
