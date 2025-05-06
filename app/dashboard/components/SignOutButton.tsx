'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export default async function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="group relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 ease-in-out hover:text-indigo-600 focus:outline-none"
      >
        <span className="relative z-10 flex items-center">
          <svg
            className="w-5 h-5 mr-2 transition-transform duration-200 ease-in-out group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          登出
        </span>
        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out bg-gray-100 rounded-lg opacity-0 group-hover:opacity-100"></span>
      </button>
    </form>
  )
} 