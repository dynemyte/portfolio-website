import { getTodoCollection } from './todoCollection'

function toTodo(document) {
  return document.toJSON()
}

function createTodoId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export async function listTodos() {
  const todosCollection = await getTodoCollection()
  const documents = await todosCollection.find().sort({ createdAt: 'asc' }).exec()
  return documents.map(toTodo)
}

export async function createTodo(text) {
  const normalizedText = text.trim()

  if (!normalizedText) {
    throw new Error('Todo text is required')
  }

  const todosCollection = await getTodoCollection()
  const document = await todosCollection.insert({
    id: createTodoId(),
    text: normalizedText,
    completed: false,
    createdAt: Date.now(),
  })

  return toTodo(document)
}

export async function toggleTodo(id) {
  const todosCollection = await getTodoCollection()
  const document = await todosCollection.findOne(id).exec()

  if (!document) {
    return null
  }

  const updatedDocument = await document.incrementalModify(previousTodo => ({
    ...previousTodo,
    completed: !previousTodo.completed,
  }))

  return toTodo(updatedDocument)
}

export async function deleteTodo(id) {
  const todosCollection = await getTodoCollection()
  const document = await todosCollection.findOne(id).exec()

  if (!document) {
    return false
  }

  await document.remove()
  return true
}
