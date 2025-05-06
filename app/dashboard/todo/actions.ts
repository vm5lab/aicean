'use server'

import { createClient } from '@/utils/supabase/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createTodo(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('未登錄')
  }

  const title = formData.get('title') as string
  if (!title) return

  await prisma.todo.create({
    data: {
      title,
      userId: user.id,
    },
  })

  revalidatePath('/dashboard/todo')
}

export async function toggleTodo(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('未登錄')
  }

  const todo = await prisma.todo.findUnique({
    where: { id },
  })

  if (!todo || todo.userId !== user.id) {
    throw new Error('無權限')
  }

  await prisma.todo.update({
    where: { id },
    data: { completed: !todo.completed },
  })

  revalidatePath('/dashboard/todo')
}

export async function deleteTodo(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('未登錄')
  }

  const todo = await prisma.todo.findUnique({
    where: { id },
  })

  if (!todo || todo.userId !== user.id) {
    throw new Error('無權限')
  }

  await prisma.todo.delete({
    where: { id },
  })

  revalidatePath('/dashboard/todo')
} 