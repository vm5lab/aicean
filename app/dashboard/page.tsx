import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import LogoutButton from '@/components/LogoutButton'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">歡迎回來，{data.user.email}！</h1>
              <LogoutButton />
            </div>
            <p className="text-gray-600">這是您的儀表板頁面。</p>
          </div>
        </div>
      </div>
    </div>
  )
}