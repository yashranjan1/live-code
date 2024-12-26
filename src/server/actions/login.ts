"use server";
import { signIn } from "@/server/auth";
import { api } from "@/trpc/server";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export const credentialLogin = async (email: string, password: string) => {
    try {
        
        await signIn("credentials", {
            email,
            password,
        });
        return redirect(`/`)
    } catch (error) {
        if (error instanceof AuthError) {
            return redirect(`/`)
        }
        throw error
    }
};

export const oauthLogin = async (provider: string, redirectTo: string) => {
    try {
        await signIn(provider, {
            redirectTo,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            return redirect(`/`)
        }
        throw error
    }
};

export const signUp = async (name: string, email: string, password: string) => {
    try {
        const res = await api.user.createUser({
            name,
            email,
            password,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            return redirect(`/`)
        }
        throw error
    }
};