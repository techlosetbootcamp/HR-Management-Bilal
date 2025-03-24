import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const protectedRoutes = ["/", "/profile", "/settings"];
  const adminRoutes = [
    "/employees/addEmployee",
    "/leaves",
    "/projects",
    "/attandance",
  ];

  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;

  if (token && ["/login", "/register"].includes(pathname)) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (!token && protectedRoutes.includes(pathname)) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (token && adminRoutes.includes(pathname)) {
    const userRole = token.role;
    if (!userRole || userRole !== "ADMIN") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/profile",
    "/settings",
    "/employees/addEmployee",
    "/projects",
    "/leaves",
    "/attandance",
  ],
};
