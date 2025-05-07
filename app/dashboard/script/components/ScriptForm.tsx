'use client'
import { useEffect, useState, useTransition } from 'react'
import { useScriptFormStore } from '../store/useScriptFormStore'
import { useRouter } from 'next/navigation'

export default function ScriptForm({
  onSubmit,
  initialData,
  mode = 'create'
}: {
  onSubmit: (data: FormData) => Promise<any>
  initialData?: any
  mode?: 'create' | 'edit'
}) {
  const { title, description, content, setField } = useScriptFormStore()
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  useEffect(() => {
    if (initialData) {
      setField('title', initialData.title || '')
      setField('description', initialData.description || '')
      setField('content', initialData.content || '')
    }
  }, [initialData, setField])

  async function handleSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const result = await onSubmit(formData)
      if (result?.error) {
        setError('請檢查欄位內容')
      } else {
        if (mode === 'create') router.push('/dashboard/script')
        else if (mode === 'edit' && initialData?.id) router.push(`/dashboard/script/${initialData.id}`)
      }
    })
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <input
        name="title"
        value={title}
        onChange={e => setField('title', e.target.value)}
        placeholder="標題"
        required
        className="w-full border rounded px-3 py-2"
        disabled={isPending}
      />
      <textarea
        name="description"
        value={description}
        onChange={e => setField('description', e.target.value)}
        placeholder="描述"
        className="w-full border rounded px-3 py-2"
        disabled={isPending}
      />
      <textarea
        name="content"
        value={content}
        onChange={e => setField('content', e.target.value)}
        placeholder="腳本內容"
        className="w-full border rounded px-3 py-2"
        disabled={isPending}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? '儲存中...' : mode === 'edit' ? '儲存變更' : '新增'}
        </button>
        <button
          type="reset"
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          disabled={isPending}
        >
          重設
        </button>
      </div>
    </form>
  )
} 