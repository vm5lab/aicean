"use server"
import { prisma } from '@/lib/prisma'

export async function updateScript({ id, title, description, content }: { id: string, title: string, description?: string, content?: string }) {
  let parsedContent: any = null
  if (content && content.trim() !== '') {
    try {
      parsedContent = JSON.parse(content)
    } catch {
      parsedContent = content
    }
  }
  await prisma.script.update({
    where: { id },
    data: {
      title,
      description,
      content: parsedContent,
    },
  })
}

export async function deleteScript(id: string) {
  await prisma.script.delete({ where: { id } })
} 