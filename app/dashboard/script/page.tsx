import ScriptList from './components/ScriptList'
import { prisma } from '@/lib/prisma'

export default async function Page() {
  const scripts = await prisma.script.findMany({ orderBy: { createdAt: 'desc' } })
  return <ScriptList scripts={scripts} />
} 