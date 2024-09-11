import { NextResponse } from 'next/server'
import { handleOAuthCallback } from '@/utils/twitterApi'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  const storedState = cookies().get('x_oauth_state')?.value
  const codeVerifier = cookies().get('x_oauth_code_verifier')?.value

  if (!code || !state || !storedState || !codeVerifier) {
    console.error('Missing parameters:', { code, state, storedState, codeVerifier })
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (state !== storedState) {
    console.error('State mismatch:', { state, storedState })
    return NextResponse.json({ error: 'Invalid state' }, { status: 400 })
  }

  try {
    const tokenData = await handleOAuthCallback(code, codeVerifier)
    console.log('tokenData=================', tokenData)

    // Clear the state and code verifier cookies
    cookies().delete('x_oauth_state')
    cookies().delete('x_oauth_code_verifier')

    // Set the access token and refresh token in secure cookies
    cookies().set('x_access_token', tokenData.access_token, { httpOnly: true, secure: true, sameSite: 'lax' })
    cookies().set('x_refresh_token', tokenData.refresh_token, { httpOnly: true, secure: true, sameSite: 'lax' })

    // Redirect to a success page or your app's main page
    return NextResponse.redirect(new URL('/home', request.url))
  } catch (error) {
    console.error('Error handling OAuth callback:', error)
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to authenticate', message: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: 'Failed to authenticate' }, { status: 500 })
  }
}
