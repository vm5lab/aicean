import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function UserProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  return (
    <div className="flex items-center">
      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
        <span className="text-sm font-medium text-indigo-600">
          {user.email?.[0].toUpperCase()}
        </span>
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-700">{user.email}</p>
        <Link
          href="/profile"
          className="text-xs text-gray-500 hover:text-indigo-600"
        >
          查看個人資料
        </Link>
      </div>
    </div>
  )
} 