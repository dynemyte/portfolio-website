import { getDatabase } from './rxdb'

export const todoSchema = {
  title: 'todo schema',
  version: 0,
  type: 'object',
  primaryKey: 'id',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    text: {
      type: 'string',
    },
    completed: {
      type: 'boolean',
    },
    createdAt: {
      type: 'number',
    },
  },
  required: ['id', 'text', 'completed', 'createdAt'],
}

let todoCollectionPromise

export function getTodoCollection() {
  if (!todoCollectionPromise) {
    todoCollectionPromise = getDatabase().then(async database => {
      if (!database.collections.todos) {
        const collections = await database.addCollections({
          todos: {
            schema: todoSchema,
          },
        })

        return collections.todos
      }

      return database.collections.todos
    })
  }

  return todoCollectionPromise
}

export default getTodoCollection
