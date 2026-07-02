import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// حدد المسارات المحمية
const isProtectedRoute = createRouteMatcher([
  '/checkout(.*)',
  '/my-purchases(.*)',
  '/success(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()


  if (isProtectedRoute(req) && !userId) {

    const homeUrl = new URL('/', req.url)
    return NextResponse.redirect(homeUrl)
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

    '/(api|trpc)(.*)',
  ],
}
