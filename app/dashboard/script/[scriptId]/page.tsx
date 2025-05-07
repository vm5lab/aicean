import { prisma } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import { updateScript, deleteScript } from './actions'

interface Props {
  params: { scriptId: string }
}

export default async function ScriptDetailPage({ params }: Props) {
  const script = await prisma.script.findUnique({
    where: { id: params.scriptId },
  })
  if (!script) return notFound()

  async function action(formData: FormData) {
    'use server'
    if (formData.get('delete')) {
      await deleteScript(script.id)
      redirect('/dashboard/script')
    } else {
      const title = formData.get('title') as string
      const description = formData.get('description') as string
      const content = formData.get('content') as string
      await updateScript({ id: script.id, title, description, content })
      redirect(`/dashboard/script/${script.id}`)
    }
  }

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">編輯專案腳本</h1>
      <form action={action} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block font-medium mb-1">標題</label>
          <input name="title" required className="w-full border rounded px-3 py-2" defaultValue={script.title} />
        </div>
        <div>
          <label className="block font-medium mb-1">描述</label>
          <textarea name="description" className="w-full border rounded px-3 py-2" rows={2} defaultValue={script.description || ''} />
        </div>
        <div>
          <label className="block font-medium mb-1">內容</label>
          <textarea name="content" className="w-full border rounded px-3 py-2" rows={4} defaultValue={typeof script.content === 'object' ? JSON.stringify(script.content, null, 2) : (script.content?.toString() || '')} />
        </div>
        <div className="flex justify-between items-center">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">儲存變更</button>
          <button type="submit" name="delete" value="1" className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">刪除</button>
        </div>
        <div className="text-xs text-red-500 mt-2">* 刪除後無法復原，請謹慎操作</div>
      </form>
    </div>
  )
} 