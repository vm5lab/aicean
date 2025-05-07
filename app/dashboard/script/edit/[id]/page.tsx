import ScriptForm from '../../components/ScriptForm'
import { updateScript } from '../../actions'
import { prisma } from '@/lib/prisma'

export default async function EditScriptPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const script = await prisma.script.findUnique({ where: { id } })
  if (!script) return <div className="text-red-500">找不到腳本</div>

  async function updateScriptWithId(formData: FormData) {
    'use server'
    return updateScript(id, formData)
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-8 border border-gray-100 mt-8">
      <h1 className="text-xl font-bold mb-4 text-indigo-700">編輯腳本</h1>
      <ScriptForm onSubmit={updateScriptWithId} initialData={script} mode="edit" />
    </div>
  )
} 