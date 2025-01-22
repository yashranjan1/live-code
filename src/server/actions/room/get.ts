"use server"

import { api } from "@/trpc/server";

export const getUserRooms = async () => {
    try {
        const rooms = await api.liveblocks.getRooms();
        return rooms;
    } catch (error) {
        throw new Error("Failed to get user rooms");
    }
}