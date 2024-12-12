// import { NextResponse } from 'next/server'
 
// // This function can be marked `async` if using `await` inside
// export function middleware(request) {
//     const path= request.nextUrl.pathname;
//     const isPublicPath= path==="/login" || path==="/signup" || path==="/verifyemail" || path==="/"

//     const token= request.cookies.get("token")?.value || ""

//     if(isPublicPath&& token){
//         return NextResponse.redirect(new URL('/', request.url))
//     }
//     if(!isPublicPath&& !token){
//         return NextResponse.redirect(new URL('/login', request.url))
//     }
// }
 
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     "/login",
//     "/signup",
//     "/profile",
//     "/verifyemail",
//     "/logout"
//   ]
// }


import { NextResponse } from 'next/server'

// This function is marked `async` to allow async operations if necessary
export function middleware(request) {
    const path = request.nextUrl.pathname;

    // Public paths where no token is required, including login/signup/verifyemail
    const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyemail" || path === "/";

    // Get token from cookies
    const token = request.cookies.get("token")?.value || "";

    // If the user is trying to access a public path but is already logged in, redirect them to the homepage
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // If the user is not logged in and is trying to access a protected route, redirect them to login page
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Additional handling for other cases (optional), e.g., checking for expired tokens, etc.
}

// Configure paths that the middleware should apply to
export const config = {
  matcher: [
    "/login",      // Login page (public)
    "/signup",     // Signup page (public)
    "/profile",    // Profile page (protected)
    "/verifyemail",// Email verification page (public)
    "/logout"      // Logout (protected or public based on session)
  ]
}
