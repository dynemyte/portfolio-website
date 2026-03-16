import { getTodoCollection } from './todoCollection'

const LEGACY_SEEDED_TODO_TEXTS = new Set([
  'check operations',
  'scan for vulnerabilities',
  'check for updates on operatives',
])

function toTodo(document) {
  const todo = document.toJSON()

  return {
    ...todo,
    text: typeof todo.text === 'string' ? todo.text : '',
    completed: Boolean(todo.completed),
    createdAt: typeof todo.createdAt === 'number' ? todo.createdAt : 0,
  }
}

function createTodoId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function isLegacySeededTodoText(text) {
  return LEGACY_SEEDED_TODO_TEXTS.has(String(text).trim().toLowerCase())
}

export async function listTodos() {
  const todosCollection = await getTodoCollection()

  const documents = await todosCollection.find().exec()

  return documents
    .map(toTodo)
    .sort((firstTodo, secondTodo) => firstTodo.createdAt - secondTodo.createdAt)
}

export async function removeLegacySeedTodos() {
  const todosCollection = await getTodoCollection()

  const documents = await todosCollection.find().exec()
  let removedCount = 0

  for (const document of documents) {
    const todo = toTodo(document)

    if (!isLegacySeededTodoText(todo.text)) {
      continue
    }

    await document.remove()
    removedCount += 1
  }

  return removedCount
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
