import { getTodoCollection } from './todoCollection'

let seedTodosPromise

const seedTodoTexts = [
  'Check Operations',
  'Scan for vulnerabilities',
  'Check for updates on Operatives',
]

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

export async function seedTodos() {
  if (!seedTodosPromise) {
    seedTodosPromise = (async () => {
      const existing = await listTodos()
      if (!existing.length) {
        await createTodo('Check Operations')
        await createTodo('Scan for vulnerabilities')
        await createTodo('Check for updates on Operatives')
        return
      }

      const seedTextSet = new Set(seedTodoTexts)
      const seenSeedTexts = new Set()

      for (const todo of existing) {
        if (!seedTextSet.has(todo.text)) {
          continue
        }

        if (seenSeedTexts.has(todo.text)) {
          await deleteTodo(todo.id)
          continue
        }

        seenSeedTexts.add(todo.text)
      }
    })().finally(() => {
      seedTodosPromise = undefined
    })
  }

  return seedTodosPromise
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
