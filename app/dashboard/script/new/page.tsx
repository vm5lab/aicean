import ScriptForm from '../components/ScriptForm'
import { createScript } from '../actions'

export default function NewScriptPage() {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-8 border border-gray-100 mt-8">
      <h1 className="text-xl font-bold mb-4 text-indigo-700">新增腳本</h1>
      <ScriptForm onSubmit={createScript} />
    </div>
  )
} 