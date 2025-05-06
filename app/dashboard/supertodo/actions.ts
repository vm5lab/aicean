'use server'

import { createClient } from '@/utils/supabase/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { cache } from 'react'

// 緩存用戶驗證
const getCurrentUser = cache(async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
})

// 批量創建待辦事項
export async function createTodos(formData: FormData) {
  const user = await getCurrentUser()
  if (!user) throw new Error('未登錄')

  const titles = formData.getAll('titles[]') as string[]
  if (!titles.length) return

  await prisma.todo.createMany({
    data: titles.map(title => ({
      title,
      userId: user.id,
    })),
  })

  revalidatePath('/dashboard/supertodo')
}

// 批量切換待辦事項狀態
export async function toggleTodos(ids: string[]) {
  const user = await getCurrentUser()
  if (!user) throw new Error('未登錄')

  const todos = await prisma.todo.findMany({
    where: {
      id: { in: ids },
      userId: user.id,
    },
  })

  if (!todos.length) throw new Error('無權限')

  await prisma.todo.updateMany({
    where: {
      id: { in: ids },
      userId: user.id,
    },
    data: {
      completed: !todos[0].completed,
    },
  })

  revalidatePath('/dashboard/supertodo')
}

// 批量刪除待辦事項
export async function deleteTodos(ids: string[]) {
  const user = await getCurrentUser()
  if (!user) throw new Error('未登錄')

  await prisma.todo.deleteMany({
    where: {
      id: { in: ids },
      userId: user.id,
    },
  })

  revalidatePath('/dashboard/supertodo')
}

// 獲取待辦事項列表（帶緩存）
export const getTodos = cache(async (userId: string) => {
  return prisma.todo.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      completed: true,
      createdAt: true,
    },
  })
}) 