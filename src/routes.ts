/**
 * An array of routes that are available to the user without needing to log in
 * 
 * @type {string[]}
 */

export const publicRoutes = [
    "/"
]

/**
 * An array of routes used for authentication
 * 
 * @type  {string[]}
 */
export const authRoutes = [
    "/sign-in",
]


/**
 * Prefix for API authentication routes
 * 
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * Default path for redirects after logging in
 * 
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard"
