import { PrismaAdapter } from "@auth/prisma-adapter";
import { CredentialsSignin, User, type DefaultSession, type NextAuthConfig } from "next-auth";
import Discord from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers"
import { db } from "@/server/db";
import { api } from "@/trpc/server";
import bcrypt from "bcryptjs";

class InvalidCredentials extends CredentialsSignin {
    code = "INVALID_CREDENTIALS";
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {


    interface Session extends DefaultSession {
        user: {
            // ...other properties
            // role: UserRole;
        } & DefaultSession["user"];
    }

    interface User {
        // ...other properties
        // role: UserRole;
    }
}

const providers: Provider[] = [
    Credentials({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials): Promise<User> {
            try {
                const userEmail = credentials.email as string;
                const userPassword = credentials.password as string;


                const user = await api.user.findUser({  
                    email: userEmail,
                });

                if (!user) {
                    throw new InvalidCredentials("INVALID_CREDENTIALS");
                }

                const doesPasswordMatch = await bcrypt.compare(userPassword, user.password as string);

                if (!doesPasswordMatch) {
                    throw new InvalidCredentials("INVALID_CREDENTIALS");
                }
                const returnVal = {
                    id: user.id,
                    name:  user.name,
                    email:  user.email,
                    image:  user.image
                } as User

                return returnVal;
            } catch (error) {
                if (error instanceof InvalidCredentials) {
                    throw new InvalidCredentials(error.code);
                }
                else {
                    throw new Error("Error authenticating user");
                }
            }
        },
    }),
    Discord,
];

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
    providers,
    adapter: PrismaAdapter(db),
    callbacks: {
        session: async ({ session, user }) => {

            console.log("Session callback - session:", session);
            console.log("Session callback - token:", user);
            return {
                ...session,
                user: {
                    ...session.user,
                    id: user.id,
                },
            }
        },    
        async jwt({ token, user }) {
            console.log("JWT callback - token:", token);
            console.log("JWT callback - user:", user);
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.image = user.image;
            }
            return token;
        },
    }, 
    pages: {
        signIn: "/sign-in",
        signOut: "/sign-out",
        error: "/error", // Error code passed in query string as ?error=
    },
} satisfies NextAuthConfig;

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
.filter((provider) => provider.id !== "credentials")
