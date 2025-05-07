import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function ScriptListPage() {
  const scripts = await prisma.script.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">專案腳本列表</h1>
        <Link href="/dashboard/script/new" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">新增專案</Link>
      </div>
      <ul className="space-y-4">
        {scripts.length === 0 && <li className="text-gray-500">目前尚無專案腳本</li>}
        {scripts.map(script => (
          <li key={script.id} className="border rounded p-4 hover:shadow">
            <Link href={`/dashboard/script/${script.id}`} className="block">
              <div className="font-semibold text-lg">{script.title}</div>
              {script.description && <div className="text-gray-600 mt-1">{script.description}</div>}
              <div className="text-xs text-gray-400 mt-2">建立於 {new Date(script.createdAt).toLocaleString()}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
} 