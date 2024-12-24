import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Discord from "next-auth/providers/discord";
import type { Provider } from "next-auth/providers"

import { db } from "@/server/db";

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
    session: ({ session, user }) => {
        return {
        ...session,
        user: {
            ...session.user,
            id: user.id,
        },
    }
    },
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
