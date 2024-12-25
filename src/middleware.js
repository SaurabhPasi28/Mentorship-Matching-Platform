// import { NextResponse } from 'next/server'

// export function middleware(request) {
//     const path = request.nextUrl.pathname;

//     const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyemail";

//     const token = request.cookies.get("token")?.value || "";

//     if (isPublicPath && token) {
//         return NextResponse.redirect(new URL('/', request.url));
//     }

//     if (!isPublicPath && !token) {
//         return NextResponse.redirect(new URL('/login', request.url));
//     }

// }

// export const config = {
//   matcher: [
//     "/login",
//     "/signup",
//     "/profile",
//     "/verifyemail",
//     "/logout",
//     "/discover",
//     "/profile/connections",
//     "/matchmaking" ,
//     "/profile/requests"
//   ]
// }

import { NextResponse } from "next/server";

export function middleware(request) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyemail";
    const token = request.cookies.get("token")?.value || "";

    console.log("Middleware triggered:", { path, tokenAvailable: Boolean(token) });

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/login",
        "/signup",
        "/profile",
        "/verifyemail",
        "/logout",
        "/discover",
        "/profile/connections",
        "/matchmaking",
        "/profile/requests",
    ],
};
