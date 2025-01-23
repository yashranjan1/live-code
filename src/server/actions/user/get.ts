"use server";

import { api } from "@/trpc/server";

export const getUserList = async () => {
    try {
        return await api.user.getUserList();
    } catch (error) {
        throw new Error("Failed to fetch users");
    }
}