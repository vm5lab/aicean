'use client'
import { deleteScript } from '../actions'
import { useRouter } from 'next/navigation'

export default function ScriptList({ scripts }: { scripts: any[] }) {
  const router = useRouter()

  async function handleDelete(id: string) {
    if (confirm('確定要刪除這個腳本嗎？')) {
      await deleteScript(id)
      router.refresh()
    }
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <a
          href="/dashboard/script/new"
          className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          ＋ 新增腳本
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scripts.map(script => (
          <div
            key={script.id}
            className="relative block p-6 bg-white rounded-lg shadow hover:shadow-md border border-gray-100 hover:border-indigo-300 transition"
          >
            <a href={`/dashboard/script/${script.id}`}>
              <h2 className="text-lg font-semibold text-indigo-700 mb-2 truncate">{script.title}</h2>
              <p className="text-gray-500 text-sm mb-2 line-clamp-2">{script.description || '（無描述）'}</p>
              <div className="text-xs text-gray-400">建立於 {new Date(script.createdAt).toLocaleString()}</div>
            </a>
            <div className="absolute top-2 right-2 flex gap-2">
              <a
                href={`/dashboard/script/edit/${script.id}`}
                className="text-xs text-indigo-600 hover:underline"
              >
                編輯
              </a>
              <button
                onClick={() => handleDelete(script.id)}
                className="text-xs text-red-500 hover:underline"
              >
                刪除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 