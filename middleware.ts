import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
    matcher: ['/'],
}

export async function middleware(request: NextRequest) {
    // if (request.nextUrl.pathname.startsWith('/dashboard')) {
    //     const response = NextResponse.next()
    //     const token = request.cookies.get('token');
    //     if (!token) {
    //         console.log("no token");
    //         return NextResponse.redirect(new URL('/login', request.url));
    //     }
    //     const user = await AuthAPI.validateToken(token);
    //     if (!user) {
    //         console.log("token invalid");
    //         response.cookies.delete('token');
    //         return NextResponse.redirect(new URL('/login', request.url));
    //     }
    // }
    // if (request.nextUrl.pathname.startsWith('/login')) {
    //     const response = NextResponse.next()
    //     const token = request.cookies.get('token');
    //     if (!token) return;
    //     const user = await AuthAPI.validateToken(token);
    //     if (user)
    //         return NextResponse.redirect(new URL('/dashboard', request.url));
    //     response.cookies.delete('token');
    // }
}
