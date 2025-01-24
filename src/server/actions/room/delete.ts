"use server"
import { api } from "@/trpc/server";
import { revalidatePath } from "next/cache";

export async function deleteRoom(roomId: string) {
    try {
        await api.liveblocks.deleteRoom({ roomId });
        revalidatePath("/dashboard");
    } catch (error) {
        throw new Error("Failed to delete room"); 
    }
}