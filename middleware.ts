import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
    matcher: ['/dashboard/:path*', '/login'],
}

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        if (!request.cookies.get('token'))
            return NextResponse.redirect(new URL('/login', request.url));
    }
    if (request.nextUrl.pathname.startsWith('/login')) {
        if (request.cookies.get('token'))
            return NextResponse.redirect(new URL('/dashboard', request.url));
    }
}
