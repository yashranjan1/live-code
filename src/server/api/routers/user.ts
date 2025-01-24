import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
    /**
     * Returns a user by id
     * 
     * @param id - The id of the user
     * @returns User
     */
    getUser: publicProcedure
        .input(z.object({
            id: z.string(),
        }))
        .query(async ({ ctx, input }) => {
            return await ctx.db.user.findUnique({
                where: {
                    id: input.id,
                },
            });
        }),
    /**
     * Returns a list of users that exclude the current logged in user
     * 
     * @returns User[]
     */
    getUserList: protectedProcedure
        .query(async ({ ctx }) => {  
            return await ctx.db.user.findMany({
                where: {
                    id: {
                        not: ctx.session.user.id,
                    },
                },
            });
        }),
});
