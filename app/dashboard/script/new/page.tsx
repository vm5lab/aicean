import { redirect } from 'next/navigation'
import { createScript } from '../actions'

export default function NewScriptPage() {
  async function action(formData: FormData) {
    'use server'
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const content = formData.get('content') as string
    await createScript({ title, description, content })
    redirect('/dashboard/script')
  }

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">新增專案腳本</h1>
      <form action={action} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block font-medium mb-1">標題</label>
          <input name="title" required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium mb-1">描述</label>
          <textarea name="description" className="w-full border rounded px-3 py-2" rows={2} />
        </div>
        <div>
          <label className="block font-medium mb-1">內容（可填 JSON 或文字）</label>
          <textarea name="content" className="w-full border rounded px-3 py-2" rows={4} />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">建立</button>
        </div>
      </form>
    </div>
  )
} 