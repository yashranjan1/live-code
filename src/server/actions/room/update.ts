"use server"
import { api } from "@/trpc/server";
import { revalidatePath } from "next/cache";

export async function updateRoom(
    input : {
        roomId: string,
        members : string[]
    }
)  {
    try {
        await api.liveblocks.updateRoom(input);
        revalidatePath("/dashboard");
    } catch (error) {
        throw new Error("Failed to update room");
    }
}