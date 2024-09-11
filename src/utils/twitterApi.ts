import axios from 'axios'
import crypto from 'crypto'
import { TwitterApi } from 'twitter-api-v2'

const baseUrl = 'https://api.x.com/2'
const authUrl = 'https://x.com/i/oauth2/authorize'
const tokenUrl = 'https://api.x.com/2/oauth2/token'

const clientId = process.env.TWITTER_CLIENT_ID!
const clientSecret = process.env.TWITTER_CLIENT_SECRET!
const redirectUri = process.env.TWITTER_REDIRECT_URI!

export async function getOAuthUrl() {
  const state = crypto.randomBytes(32).toString('hex')
  const codeVerifier = crypto.randomBytes(32).toString('base64url')
  const codeChallenge = crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')

  const url = new URL(authUrl)
  url.searchParams.append('response_type', 'code')
  url.searchParams.append('client_id', clientId)
  url.searchParams.append('redirect_uri', redirectUri)
  url.searchParams.append('scope', 'tweet.read tweet.write users.read offline.access')
  url.searchParams.append('state', state)
  url.searchParams.append('code_challenge', codeChallenge)
  url.searchParams.append('code_challenge_method', 'S256')

  return { url: url.toString(), state, codeVerifier }
}

export async function handleOAuthCallback(code: string, codeVerifier: string) {
  const params = new URLSearchParams()
  params.append('code', code)
  params.append('grant_type', 'authorization_code')
  params.append('client_id', clientId)
  params.append('redirect_uri', redirectUri)
  params.append('code_verifier', codeVerifier)

  try {
    const response = await axios.post(tokenUrl, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: clientId,
        password: clientSecret
      }
    })

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data)
      throw new Error(`Twitter API error: ${JSON.stringify(error.response?.data)}`)
    }
    throw error
  }
}

export async function refreshAccessToken(refreshToken: string) {
  const params = new URLSearchParams()
  params.append('grant_type', 'refresh_token')
  params.append('refresh_token', refreshToken)

  const response = await axios.post(tokenUrl, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
      username: clientId,
      password: clientSecret
    }
  })

  return response.data
}

export async function refreshTwitterToken(refreshToken: string) {
  const client = new TwitterApi({
    clientId: process.env.TWITTER_CLIENT_ID!,
    clientSecret: process.env.TWITTER_CLIENT_SECRET!
  })

  try {
    const { accessToken, refreshToken: newRefreshToken } = await client.refreshOAuth2Token(refreshToken)
    return { accessToken, refreshToken: newRefreshToken }
  } catch (error) {
    console.error('Error refreshing Twitter token:', error)
    throw error
  }
}

export async function postTweet(text: string, accessToken: string) {
  const url = `${baseUrl}/tweets`
  const data = { text }

  try {
    console.log('response.data=================', accessToken)
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error posting tweet:', error)
    // throw error
  }
}

export async function getUserTweets(userId: string, accessToken: string) {
  const url = `${baseUrl}/users/${userId}/tweets`

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching user tweets:', error)
    throw error
  }
}

export async function verifyTokenPermissions(accessToken: string) {
  const client = new TwitterApi(accessToken)
  try {
    // Try to get the authenticated user's information
    const user = await client.v2.me()
    console.log('Authenticated user:', user)

    // You can add more checks here if needed

    return true
  } catch (error) {
    console.error('Error verifying token permissions:', error)
    throw error
  }
}
