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

export const getRoomById = async (roomId: string) => {
    try {
        const roomData = await api.liveblocks.getRoomData({
            roomId: roomId
        });
        return roomData;
    } catch (error) {
        throw new Error("Failed to get room");
    }
}