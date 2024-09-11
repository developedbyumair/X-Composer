import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { TwitterApi } from 'twitter-api-v2'
import { refreshTwitterToken, verifyTokenPermissions } from '@/utils/twitterApi'

export async function POST(request: Request) {
  let accessToken = cookies().get('x_access_token')?.value
  if (!accessToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // Refresh token before proceeding
  const refreshToken = cookies().get('x_refresh_token')?.value
  if (refreshToken) {
    try {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await refreshTwitterToken(refreshToken)
      accessToken = newAccessToken
      cookies().set('x_access_token', newAccessToken, { httpOnly: true, secure: true })
      if (newRefreshToken) {
        cookies().set('x_refresh_token', newRefreshToken, { httpOnly: true, secure: true })
      }
    } catch (refreshError) {
      console.error('Error refreshing token:', refreshError)
      return NextResponse.json({ error: 'Failed to refresh token' }, { status: 401 })
    }
  }

  // Verify token permissions
  try {
    await verifyTokenPermissions(accessToken)
  } catch (error) {
    console.error('Token verification failed:', error)
    return NextResponse.json({ error: 'Invalid token permissions' }, { status: 403 })
  }

  const twitterClient = new TwitterApi(accessToken)
  const { text, image } = await request.json()
  console.log('text=================', text)
  console.log('image=================', image ? 'Image present' : 'No image')

  try {
    let mediaId
    if (image) {
      // Upload the image using v1.1 API
      try {
        console.log('Attempting to upload media...')
        const mediaUpload = await twitterClient.v1.uploadMedia(Buffer.from(image.split(',')[1], 'base64'), {
          mimeType: 'image/png'
        })
        mediaId = mediaUpload
        console.log('Media uploaded successfully, ID:', mediaId)
      } catch (uploadError: unknown) {
        console.error('Error uploading media:', JSON.stringify(uploadError, null, 2))
        if (uploadError instanceof Error) {
          return NextResponse.json({ error: 'Failed to upload media', details: uploadError.message }, { status: 500 })
        }
        return NextResponse.json({ error: 'Failed to upload media' }, { status: 500 })
      }
    }

    // Post the tweet using v2 API
    try {
      console.log('Attempting to post tweet...')
      const tweet = await twitterClient.v2.tweet(text, mediaId ? { media: { media_ids: [mediaId] } } : undefined)
      console.log('Tweet posted successfully:', JSON.stringify(tweet, null, 2))
      return NextResponse.json({ success: true, tweet })
    } catch (tweetError: unknown) {
      console.error('Error posting tweet:', JSON.stringify(tweetError, null, 2))
      if (tweetError instanceof Error) {
        return NextResponse.json({ error: 'Failed to post tweet', details: tweetError.message }, { status: 500 })
      }
      return NextResponse.json({ error: 'Failed to post tweet' }, { status: 500 })
    }
  } catch (error: unknown) {
    console.error('Error in tweet process:', JSON.stringify(error, null, 2))
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
