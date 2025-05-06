'use client'

import { useState, useTransition } from 'react'
import { createTodos, toggleTodos, deleteTodos } from './actions'

interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState(initialTodos)
  const [isPending, startTransition] = useTransition()
  const [newTodo, setNewTodo] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    const formData = new FormData()
    formData.append('titles[]', newTodo)

    // 樂觀更新
    const tempId = `temp-${Date.now()}`
    setTodos(prev => [{
      id: tempId,
      title: newTodo,
      completed: false,
      createdAt: new Date(),
    }, ...prev])
    setNewTodo('')

    startTransition(async () => {
      await createTodos(formData)
    })
  }

  const handleToggle = async (id: string) => {
    // 樂觀更新
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))

    startTransition(async () => {
      await toggleTodos([id])
    })
  }

  const handleDelete = async (id: string) => {
    // 樂觀更新
    setTodos(prev => prev.filter(todo => todo.id !== id))

    startTransition(async () => {
      await deleteTodos([id])
    })
  }

  const handleBatchToggle = async (ids: string[]) => {
    if (!ids.length) return

    // 樂觀更新
    setTodos(prev => prev.map(todo =>
      ids.includes(todo.id) ? { ...todo, completed: !todo.completed } : todo
    ))

    startTransition(async () => {
      await toggleTodos(ids)
    })
  }

  const handleBatchDelete = async (ids: string[]) => {
    if (!ids.length) return

    // 樂觀更新
    setTodos(prev => prev.filter(todo => !ids.includes(todo.id)))

    startTransition(async () => {
      await deleteTodos(ids)
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="p-6 border-b border-gray-100">
        <div className="flex gap-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="新增待辦事項..."
            className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            新增
          </button>
        </div>
      </form>

      <div className="p-6">
        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleToggle(todo.id)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    todo.completed
                      ? 'bg-indigo-600 border-indigo-600'
                      : 'border-gray-300 hover:border-indigo-600'
                  }`}
                >
                  {todo.completed && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
                <span
                  className={`text-sm ${
                    todo.completed ? 'text-gray-400 line-through' : 'text-gray-900'
                  }`}
                >
                  {todo.title}
                </span>
              </div>
              <button
                onClick={() => handleDelete(todo.id)}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
} 