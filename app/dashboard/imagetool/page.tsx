import { createClient } from '@/utils/supabase/server'
import ImageGenerator from './components/ImageGenerator'
import ImageGallery from './components/ImageGallery'

export default async function ImageToolPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-900">AI 圖片生成</h2>
        </div>
        <div className="p-6">
          <ImageGenerator userId={user.id} />
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-900">我的圖片</h2>
        </div>
        <div className="p-6">
          <ImageGallery userId={user.id} />
        </div>
      </div>
    </div>
  )
} 