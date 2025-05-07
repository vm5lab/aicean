"use server"
import { prisma } from '@/lib/prisma'

export async function createScript({ title, description, content }: { title: string, description?: string, content?: string }) {
  let parsedContent: any = null
  if (content && content.trim() !== '') {
    try {
      parsedContent = JSON.parse(content)
    } catch {
      parsedContent = content
    }
  }
  await prisma.script.create({
    data: {
      title,
      description,
      content: parsedContent,
    },
  })
} 