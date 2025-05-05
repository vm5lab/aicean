import { createClient } from '@/utils/supabase/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const supabase = createClient()
    const { data: { user }, error } = await (await supabase).auth.getUser()
    
    if (error || !user) {
      return NextResponse.json({ error: '未授權' }, { status: 401 })
    }

    const userData = await prisma.profile.findUnique({
      where: { userId: user.id }
    })

    return NextResponse.json(userData)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = createClient()
    const { data: { user }, error } = await (await supabase).auth.getUser()
    
    if (error || !user) {
      return NextResponse.json({ error: '未授權' }, { status: 401 })
    }

    const body = await request.json()
    const { fullName, phone, address } = body

    const updatedProfile = await prisma.profile.upsert({
      where: {
        userId: user.id
      },
      update: {
        fullName,
        phone,
        address,
      },
      create: {
        userId: user.id,
        fullName,
        phone,
        address,
      }
    })

    return NextResponse.json(updatedProfile)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
} 