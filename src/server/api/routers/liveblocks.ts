import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { liveblocks } from "@/lib/server/liveblocks";
import { auth } from "@/server/auth";
import { RoomAccessTypes } from "@/types/liveblocks";
import { RoomAccesses } from "@liveblocks/node";

export const liveBlocksRouter = createTRPCRouter({
	identify: protectedProcedure
		.mutation(async () => {
			    // Get the current user from your database
				const session = await auth();

				if (!session) {
					return new Response("Unauthorized", { status: 401 });
				}
			
				const { id, name, color, avatar } = session.user.info; 
			
				// Identify the user and return the result
				const { status, body } = await liveblocks.identifyUser(
					{
						userId: id,
						groupIds: []
						
					},
					{ userInfo: { name, color, avatar } },
				);
			
				return { status, body };
		}),
	createRoom: protectedProcedure
		.input(
			z.object({
				name: z.string(),
				members: z.array(z.string()),
			}),
		)
		.mutation(async ({ input }) => {
			
			const session = await auth();

			if (!session) {
				throw new Error("Unauthorized");
			}

			const { id } = session.user.info; 

			const access: RoomAccesses = {};

			access[id] = [RoomAccessTypes.WRITE];

			input.members.map((member) => {
				access[member] = [RoomAccessTypes.WRITE];
			});

			try {
				const response = await liveblocks.createRoom(input.name, {
					defaultAccesses: [],
					usersAccesses: access
				});

				return response;
			} catch (error) {
				throw new Error("Failed to create room");
			}
		}),
	getRooms: protectedProcedure
		.query(async () => {
			const session = await auth();

			if (!session) {
				throw new Error("Unauthorized");
			}

			const { id } = session.user; 

			try {
				const response = await liveblocks.getRooms({
					userId: id
				});
				return response;
			} catch (error) {
				throw new Error("Failed to get rooms");
			}
		}),
	getRoom: publicProcedure
		.input(
			z.object({
				roomId: z.string(),
			}),
		)
		.query(async ({ input }) => {
			try {
				const response = await liveblocks.getRoom(input.roomId);
				return response;
			} catch (error) {
				throw new Error("Failed to get room");
			}
		}),
	deleteRoom: protectedProcedure
		.input(
			z.object({
				roomId: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			const session = await auth();

			if (!session) {
				throw new Error("Unauthorized");
			}

			const { id } = session.user.info; 
			
			const rooms = await liveblocks.getRooms({
				userId: id
			});

			if (!rooms.data.find((room) => room.id === input.roomId)) {
				throw new Error("Room not found");
			}

			try {
				const response = await liveblocks.deleteRoom(input.roomId);
				return response;
			} catch (error) {
				throw new Error("Failed to delete room");
			}
		}),
});
