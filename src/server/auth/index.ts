import NextAuth from "next-auth";
import { cache } from "react";

import { authConfig } from "./config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "../db";
import { getRandom } from "@/lib/server/getRandom";
import { colors } from "data/color";

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth({
    providers: authConfig.providers,
    adapter: PrismaAdapter(db),
    callbacks: {
        jwt: async ({ token, user }) => {
            return token
        },
        session: async ({ token, session }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub,
                    info: {
                        id: token.sub,
                        name: token.name,
                        avatar: token.image,
                        color: getRandom(colors, token.sub)
                    }
                }
            }
        }
    },
    session: authConfig.session,
    pages: authConfig.pages
});

const auth = cache(uncachedAuth);

export { auth, handlers, signIn, signOut };
