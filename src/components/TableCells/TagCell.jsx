export const TagCell = ({ value, colorPalette }) => {
  return (
    <Tag.Root size="sm" variant="subtle" colorPalette={colorPalette}>
      <Tag.Label>{value}</Tag.Label>
    </Tag.Root>
  )
}
