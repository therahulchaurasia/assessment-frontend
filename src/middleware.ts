import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"
import { AuthToken } from "./types/type.d"
const protectedPages = ["/", "/task", "/feed"]
const loginURL = "/login"

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const { url, cookies } = req
  const resNext = NextResponse.next()
  const pathname = req.nextUrl.pathname
  // Skip middleware for asset requests
  if (
    pathname.startsWith("/static/") ||
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/images/")
  ) {
    return resNext
  }

  const token = cookies.get("authToken")?.value
  const decoded = jwt.decode(token || "") as AuthToken
  if (protectedPages.includes(pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL(loginURL, url))
    }
    if (!decoded) {
      return NextResponse.redirect(new URL(loginURL, url))
    }
    const { exp = 0 } = decoded || {}
    if (exp * 1000 < Date.now()) {
      cookies.delete("authToken")
      return NextResponse.redirect(new URL(loginURL, url))
    }
  }
  return resNext
}
