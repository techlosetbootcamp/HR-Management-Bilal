import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const authRoutes = ["/login", "/register"];
    const protectedRoutes = ["/dashboard", "/profile", "/settings"]; 

    const url = req.nextUrl.clone();
    const { pathname } = req.nextUrl;

    if (token && authRoutes.includes(pathname)) {
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
    }

    if (!token && protectedRoutes.includes(pathname)) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = { matcher: ["/", "/login", "/register", "/dashboard", "/profile", "/settings"] };
