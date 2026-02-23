import { Heading, Box } from '@chakra-ui/react'
import { operatives as operativesData } from '../../../data'
import { OperativesGrid } from '../components'

export default function Operatives() {
  return (
    <div>
      <OperativesGrid operatives={operativesData} />
    </div>
  )
}
