import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { TwitterApi } from 'twitter-api-v2'

export async function POST(request: Request) {
  const accessToken = cookies().get('x_access_token')?.value
  if (!accessToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const twitterClient = new TwitterApi(accessToken)
  const { text } = await request.json()

  try {
    const tweet = await twitterClient.v2.tweet(text)
    console.log('tweet=================', tweet)
    return NextResponse.json({ success: true, tweet })
  } catch (error) {
    console.error('Error posting tweet:', error)
    return NextResponse.json({ error: 'Failed to post tweet' }, { status: 500 })
  }
}
