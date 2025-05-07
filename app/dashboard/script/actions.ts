'use server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const scriptSchema = z.object({
  title: z.string().min(1, '標題必填'),
  description: z.string().optional(),
  content: z.any().optional(),
})

export async function createScript(formData: FormData) {
  const data = Object.fromEntries(formData)
  const parsed = scriptSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.flatten() }
  }
  const script = await prisma.script.create({ data: parsed.data })
  return { script }
}

export async function updateScript(id: string, formData: FormData) {
  const data = Object.fromEntries(formData)
  const parsed = scriptSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.flatten() }
  }
  const script = await prisma.script.update({
    where: { id },
    data: parsed.data,
  })
  return { script }
}

export async function deleteScript(id: string) {
  await prisma.script.delete({ where: { id } })
  return { success: true }
} 