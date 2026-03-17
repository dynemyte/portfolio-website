import { useState } from 'react'
import { Button, Drawer, Input, Portal } from '@chakra-ui/react'

export default function AddDrawer({ isOpen, onClose, onSubmit, title }) {
  const [inputValue, setInputValue] = useState('')

  const handleSave = async () => {
    const trimmedInputValue = inputValue.trim()

    if (!trimmedInputValue) {
      return
    }

    await onSubmit(trimmedInputValue)
    setInputValue('')
    onClose()
  }

  return (
    <Drawer.Root
      placement="end"
      open={isOpen}
      onOpenChange={event => {
        if (!event.open) {
          onClose()
        }
      }}
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>{title}</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
              <Input
                placeholder="Task title"
                value={inputValue}
                onChange={event => setInputValue(event.target.value)}
                onKeyDown={event => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    void handleSave()
                  }
                }}
              />
            </Drawer.Body>

            <Drawer.Footer>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
