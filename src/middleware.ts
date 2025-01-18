import NextAuth from "next-auth";

import { authConfig } from "./server/auth/config";

import {
    publicRoutes,
    apiAuthPrefix,
    DEFAULT_LOGIN_REDIRECT,
    authRoutes 
} from "@/routes" 
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig)

export default auth((request) => {
    const { nextUrl } = request;

    const isLoggedIn =  !!request.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute){
        return NextResponse.next()
    }

    if (isAuthRoute){
        if(isLoggedIn){
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return NextResponse.next()
    }

    if (!isPublicRoute && !isLoggedIn){
        return NextResponse.redirect(new URL("/", nextUrl))
    }

    return NextResponse.next()
})

export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    ],
}