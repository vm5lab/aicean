'use client'
import { useEffect } from 'react'
import { useScriptFormStore } from '../store/useScriptFormStore'

export default function ScriptForm({ onSubmit, initialData }: { onSubmit: (data: any) => void, initialData?: any }) {
  const { title, description, content, setField } = useScriptFormStore()

  useEffect(() => {
    if (initialData) {
      setField('title', initialData.title || '')
      setField('description', initialData.description || '')
      setField('content', initialData.content || '')
    }
  }, [initialData, setField])

  return (
    <form action={onSubmit} className="space-y-4">
      <input
        name="title"
        value={title}
        onChange={e => setField('title', e.target.value)}
        placeholder="標題"
        required
        className="w-full border rounded px-3 py-2"
      />
      <textarea
        name="description"
        value={description}
        onChange={e => setField('description', e.target.value)}
        placeholder="描述"
        className="w-full border rounded px-3 py-2"
      />
      <textarea
        name="content"
        value={content}
        onChange={e => setField('content', e.target.value)}
        placeholder="腳本內容"
        className="w-full border rounded px-3 py-2"
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">儲存</button>
        <button type="reset" className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">重設</button>
      </div>
    </form>
  )
} 