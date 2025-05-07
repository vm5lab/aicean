import { prisma } from '@/lib/prisma'

export default async function ScriptDetail({ params }: { params: { id: string } }) {
  const { id } = await params
  const script = await prisma.script.findUnique({ where: { id } })
  if (!script) return <div className="text-red-500">找不到腳本</div>
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 border border-gray-100 mt-8">
      <h1 className="text-2xl font-bold text-indigo-700 mb-4">{script.title}</h1>
      <p className="text-gray-600 mb-4">{script.description || '（無描述）'}</p>
      <div className="mb-4">
        <span className="text-xs text-gray-400">建立於 {new Date(script.createdAt).toLocaleString()}</span>
      </div>
      <div className="prose max-w-none bg-gray-50 p-4 rounded">
        <pre className="whitespace-pre-wrap break-all">{JSON.stringify(script.content, null, 2)}</pre>
      </div>
    </div>
  )
} 