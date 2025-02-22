import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const authRoutes = ["/login", "/register"];
    const protectedRoutes = ["/", "/profile", "/settings"];
    const adminRoutes = ["/employees/addEmployee"]; // 🔒 Only admins can access this

    const url = req.nextUrl.clone();
    const { pathname } = req.nextUrl;

    // 🔑 Redirect authenticated users away from login/register
    if (token && authRoutes.includes(pathname)) {
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    // 🔐 Protect routes that require authentication
    if (!token && protectedRoutes.includes(pathname)) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    // 🔒 Restrict access to admin routes
    if (token && adminRoutes.includes(pathname)) {
        const userRole = token.role; // Get user role from token
        if (!userRole || userRole !== "ADMIN") {
            url.pathname = "/"; // Redirect non-admins to home
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = { matcher: ["/", "/login", "/register", "/profile", "/settings", "/employees/addEmployee"] };
