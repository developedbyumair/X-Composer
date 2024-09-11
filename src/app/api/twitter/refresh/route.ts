import { NextResponse } from 'next/server'
import { refreshAccessToken } from '@/utils/twitterApi'
import { cookies } from 'next/headers'

export async function GET() {
  const refreshToken = cookies().get('twitter_refresh_token')?.value

  if (!refreshToken) {
    return NextResponse.json({ error: 'No refresh token found' }, { status: 401 })
  }

  try {
    const tokenData = await refreshAccessToken(refreshToken)

    // Update the access token and refresh token in secure cookies
    console.log('tokenData', tokenData)
    cookies().set('x_access_token', tokenData.access_token, { httpOnly: true, secure: true })
    cookies().set('x_refresh_token', tokenData.refresh_token, { httpOnly: true, secure: true })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error refreshing token:', error)
    return NextResponse.json({ error: 'Failed to refresh token' }, { status: 500 })
  }
}
