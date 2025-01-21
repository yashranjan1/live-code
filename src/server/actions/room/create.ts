"use server"
import { api } from "@/trpc/server";

export async function createRoom(name: string) {
    return await api.liveblocks.createRoom({ name });
}