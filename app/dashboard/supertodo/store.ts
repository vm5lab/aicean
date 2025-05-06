import { create } from 'zustand'
import { createTodos, toggleTodos, deleteTodos } from './actions'

interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

interface TodoStore {
  todos: Todo[]
  isPending: boolean
  newTodo: string
  setNewTodo: (todo: string) => void
  addTodo: (todo: Todo) => void
  updateTodo: (id: string, completed: boolean) => void
  removeTodo: (id: string) => void
  batchUpdateTodos: (ids: string[], completed: boolean) => void
  batchRemoveTodos: (ids: string[]) => void
  setTodos: (todos: Todo[]) => void
  setIsPending: (isPending: boolean) => void
  handleSubmit: (e: React.FormEvent) => Promise<void>
  handleToggle: (id: string) => Promise<void>
  handleDelete: (id: string) => Promise<void>
  handleBatchToggle: (ids: string[]) => Promise<void>
  handleBatchDelete: (ids: string[]) => Promise<void>
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  isPending: false,
  newTodo: '',
  setNewTodo: (todo) => set({ newTodo: todo }),
  addTodo: (todo) => set((state) => ({ todos: [todo, ...state.todos] })),
  updateTodo: (id, completed) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed } : todo
      ),
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  batchUpdateTodos: (ids, completed) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        ids.includes(todo.id) ? { ...todo, completed } : todo
      ),
    })),
  batchRemoveTodos: (ids) =>
    set((state) => ({
      todos: state.todos.filter((todo) => !ids.includes(todo.id)),
    })),
  setTodos: (todos) => set({ todos }),
  setIsPending: (isPending) => set({ isPending }),

  handleSubmit: async (e) => {
    e.preventDefault()
    const { newTodo, addTodo, setNewTodo, setIsPending } = get()
    if (!newTodo.trim()) return

    const formData = new FormData()
    formData.append('titles[]', newTodo)

    // 樂觀更新
    const tempId = `temp-${Date.now()}`
    addTodo({
      id: tempId,
      title: newTodo,
      completed: false,
      createdAt: new Date(),
    })
    setNewTodo('')

    setIsPending(true)
    try {
      await createTodos(formData)
    } finally {
      setIsPending(false)
    }
  },

  handleToggle: async (id) => {
    const { updateTodo, setIsPending } = get()
    const todo = get().todos.find((t) => t.id === id)
    if (!todo) return

    // 樂觀更新
    updateTodo(id, !todo.completed)

    setIsPending(true)
    try {
      await toggleTodos([id])
    } finally {
      setIsPending(false)
    }
  },

  handleDelete: async (id) => {
    const { removeTodo, setIsPending } = get()

    // 樂觀更新
    removeTodo(id)

    setIsPending(true)
    try {
      await deleteTodos([id])
    } finally {
      setIsPending(false)
    }
  },

  handleBatchToggle: async (ids) => {
    if (!ids.length) return
    const { batchUpdateTodos, setIsPending } = get()
    const todos = get().todos.filter((t) => ids.includes(t.id))
    if (!todos.length) return

    // 樂觀更新
    batchUpdateTodos(ids, !todos[0].completed)

    setIsPending(true)
    try {
      await toggleTodos(ids)
    } finally {
      setIsPending(false)
    }
  },

  handleBatchDelete: async (ids) => {
    if (!ids.length) return
    const { batchRemoveTodos, setIsPending } = get()

    // 樂觀更新
    batchRemoveTodos(ids)

    setIsPending(true)
    try {
      await deleteTodos(ids)
    } finally {
      setIsPending(false)
    }
  },
})) 