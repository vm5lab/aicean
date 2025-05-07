import ScriptList from './components/ScriptList'
import { prisma } from '@/lib/prisma'

export default async function Page() {
  const scripts = await prisma.script.findMany({ orderBy: { createdAt: 'desc' } })
  // 在 Server 端格式化日期，避免 hydration mismatch
  const scriptsWithDate = scripts.map(script => ({
    ...script,
    createdAtText: script.createdAt.toLocaleString('zh-TW', { hour12: false }),
  }))
  return <ScriptList scripts={scriptsWithDate} />
} 