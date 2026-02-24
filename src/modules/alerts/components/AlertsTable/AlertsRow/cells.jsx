import { Box, Text, Tag } from '@chakra-ui/react'
import { SEVERITY_PALETTE, ALERT_TYPE_PALETTE } from '../constants'

const formatLabel = value =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : 'Unknown'

export const TitleCell = ({ title }) => (
  <Box flex="2">
    <Text fontWeight="semibold" color="gray.900">
      {title}
    </Text>
  </Box>
)

export const SeverityCell = ({ severity }) => {
  const label = formatLabel(severity ?? 'unknown')
  const colorPalette = SEVERITY_PALETTE[severity] || 'gray'

  return (
    <Box flex="1" display="flex" alignItems="center">
      <Tag.Root size="sm" variant="subtle" colorPalette={colorPalette}>
        <Tag.Label>{label}</Tag.Label>
      </Tag.Root>
    </Box>
  )
}

export const AlertTypeCell = ({ type }) => {
  const label = formatLabel(type ?? 'unknown')
  const colorPalette = ALERT_TYPE_PALETTE[type] || 'gray'

  return (
    <Box flex="1" display="flex" alignItems="center">
      <Tag.Root size="sm" variant="subtle" colorPalette={colorPalette}>
        <Tag.Label>{label}</Tag.Label>
      </Tag.Root>
    </Box>
  )
}

const getPreviewText = (text, maxWords = 10) => {
  if (!text) return 'No message'

  const words = text.split(' ')

  if (words.length <= maxWords) {
    return text
  }

  return words.slice(0, maxWords).join(' ') + '...'
}

export const MessagePreviewCell = ({ message }) => {
  const preview = getPreviewText(message, 10)

  return (
    <Box flex="3">
      <Text fontSize="sm" color="gray.600">
        {preview}
      </Text>
    </Box>
  )
}
