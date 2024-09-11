import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { TwitterApi } from 'twitter-api-v2'

export async function GET() {
  const accessToken = cookies().get('x_access_token')?.value
  if (!accessToken) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 })
  }
  const twitterClient = new TwitterApi(accessToken)
  const user = await twitterClient.v2.me()
  return NextResponse.json({ isAuthenticated: true, user })
}
