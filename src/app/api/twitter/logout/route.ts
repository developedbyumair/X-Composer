import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  cookies().delete('x_access_token')
  cookies().delete('x_refresh_token')
  return NextResponse.json({ success: true })
}
