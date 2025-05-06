import { createClient } from '@/utils/supabase/server'
import { getTodos } from './actions'
import TodoList from './TodoList'

export default async function SuperTodoPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const todos = await getTodos(user.id)

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-900">超級待辦事項</h2>
        </div>
        <TodoList initialTodos={todos} />
      </div>
    </div>
  )
} 