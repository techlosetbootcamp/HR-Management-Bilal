import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const protectedRoutes = ["/", "/profile", "/settings"];
    const adminRoutes = ["/employees/addEmployee", ""]; // 🔒 Restrict access

    const url = req.nextUrl.clone();
    const { pathname } = req.nextUrl;

    // 🔑 Redirect authenticated users away from login/register
    if (token && ["/login", "/register"].includes(pathname)) {
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    // 🔐 Protect pages that require authentication
    if (!token && protectedRoutes.includes(pathname)) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    // 🔒 Restrict access to admin routes & API
    if (token && adminRoutes.includes(pathname)) {
        const userRole = token.role;
        if (!userRole || userRole !== "ADMIN") {
            return new NextResponse("Forbidden", { status: 403 });
        }
    }

    return NextResponse.next();
}

export const config = { matcher: ["/", "/login", "/register", "/profile", "/settings", "/employees/addEmployee"] };
