import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('x_access_token')?.value

  if (!token && request.nextUrl.pathname.startsWith('/posts-composer')) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  if (token && request.nextUrl.pathname === '/home') {
    return NextResponse.redirect(new URL('/posts-composer', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/home', '/posts-composer']
}
