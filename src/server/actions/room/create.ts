"use server"
import { api } from "@/trpc/server";

export async function createRoom(name: string, members: string[]) {
    return await api.liveblocks.createRoom({ name, members });
}