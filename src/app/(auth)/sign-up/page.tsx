"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Form, useForm } from "react-hook-form"
import { SignUpSchema } from "@/schema/SignUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { SignInSchema } from "@/schema/SignInSchema";
import SignUpForm from "@/components/SignUpForm";



export default function Page() {

    const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
        console.log(data)
    }

	return (
        <div className="flex flex-col items-center justify-center gap-4 p-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Sign Up</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <SignUpForm />
                </CardContent>
                <CardFooter>
                </CardFooter>
            </Card>
        </div>
	);
}