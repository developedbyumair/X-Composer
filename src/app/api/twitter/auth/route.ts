import { NextResponse } from 'next/server'
import { getOAuthUrl } from '@/utils/twitterApi'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const { url, state, codeVerifier } = await getOAuthUrl()

    // Store state and codeVerifier in cookies
    cookies().set('x_oauth_state', state, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 3600 })
    cookies().set('x_oauth_code_verifier', codeVerifier, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 3600
    })

    return NextResponse.json({ url })
  } catch (error) {
    console.error('Error getting OAuth URL:', error)
    return NextResponse.json({ error: 'Failed to get OAuth URL' }, { status: 500 })
  }
}
