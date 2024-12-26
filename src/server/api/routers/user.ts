import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import bcrypt from "bcryptjs";

export const userRouter = createTRPCRouter({
    findUser: publicProcedure
        .input(z.object({ 
            email: z.string(),
        }))
        .query(async ({ ctx, input }) => {
            return await ctx.db.user.findUnique({
                where: {
                    email: input.email,
                },
            });
        }),
    createUser: publicProcedure
        .input(z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(8),
        }))
        .mutation(async ({ ctx, input }) => {

            const hashedPassword = await bcrypt.hash(input.password, 10);

            return await ctx.db.user.create({
                data: {
                    name: input.name,
                    email: input.email,
                    password: hashedPassword,
                },
            });
        }), 
});
