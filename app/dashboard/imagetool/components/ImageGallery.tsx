'use client'

import { useEffect, useState } from 'react'
import { getImages, deleteImage } from '../actions'
import Image from 'next/image'

interface Image {
  id: string
  url: string
  prompt: string
  createdAt: string
}

interface ImageGalleryProps {
  userId: string
}

export default function ImageGallery({ userId }: ImageGalleryProps) {
  const [images, setImages] = useState<Image[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchImages = async () => {
    try {
      const data = await getImages(userId)
      setImages(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '獲取圖片失敗')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [userId])

  const handleDelete = async (id: string) => {
    if (!confirm('確定要刪除這張圖片嗎？')) return

    try {
      await deleteImage(id)
      setImages(images.filter(image => image.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : '刪除圖片失敗')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">{error}</h3>
          </div>
        </div>
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">還沒有生成任何圖片</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image) => (
        <div
          key={image.id}
          className="relative group bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <div className="aspect-w-1 aspect-h-1">
            <Image
              src={image.url}
              alt={image.prompt}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-500 line-clamp-2">{image.prompt}</p>
            <p className="mt-1 text-xs text-gray-400">
              {new Date(image.createdAt).toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => handleDelete(image.id)}
            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
} 