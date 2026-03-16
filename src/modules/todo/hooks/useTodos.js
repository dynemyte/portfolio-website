import { useEffect, useState } from 'react'
import {
  listTodos,
  removeLegacySeedTodos,
  createTodo,
  toggleTodo as toggleTodoInRepository,
  deleteTodo as deleteTodoInRepository,
} from '../data/todoRepository'

const LEGACY_SEEDED_TODOS_CLEANUP_KEY = 'todo:legacy-seeded-todos-cleanup-v1'

function hasRunLegacySeededTodosCleanup() {
  if (typeof window === 'undefined') {
    return true
  }

  try {
    return window.localStorage.getItem(LEGACY_SEEDED_TODOS_CLEANUP_KEY) === 'true'
  } catch {
    return false
  }
}

function markLegacySeededTodosCleanupAsCompleted() {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(LEGACY_SEEDED_TODOS_CLEANUP_KEY, 'true')
  } catch {
    console.error('Failed to persist legacy seeded todo cleanup flag')
  }
}

export default function useTodos() {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadTodos = async () => {
    try {
      setError(null)

      if (!hasRunLegacySeededTodosCleanup()) {
        await removeLegacySeedTodos()
        markLegacySeededTodosCleanupAsCompleted()
      }

      const data = await listTodos()
      setTodos(data)
    } catch (error) {
      console.error('Failed to load todos', error)
      setTodos([])
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadTodos()
  }, [])

  const addTodo = async text => {
    try {
      setError(null)
      await createTodo(text)
      await loadTodos()
    } catch (error) {
      console.error('Failed to add todo', error)
      setError(error)
    }
  }

  const toggleTodo = async id => {
    try {
      setError(null)
      await toggleTodoInRepository(id)
      await loadTodos()
    } catch (error) {
      console.error('Failed to toggle todo', error)
      setError(error)
    }
  }

  const deleteTodo = async id => {
    try {
      setError(null)
      await deleteTodoInRepository(id)
      await loadTodos()
    } catch (error) {
      console.error('Failed to delete todo', error)
      setError(error)
    }
  }

  return {
    todos,
    isLoading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
  }
}
