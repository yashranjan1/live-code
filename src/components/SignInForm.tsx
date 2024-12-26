"use client";

import { Button } from "@/components/ui/button";
import {
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage, 
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { SignInSchema } from "@/schema/SignInSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { credentialLogin } from "@/server/actions/login";


export default function SignInForm() {

     const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
    });

    const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
        try {
            await credentialLogin(data.email, data.password)
        } catch (error) {
            if (error instanceof AuthError) {
                return redirect(`/`)
            }
            throw error
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    Sign in
                </Button>
            </form>     
        </Form> 
    )
}
            