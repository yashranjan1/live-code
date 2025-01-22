"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateRoomSchema } from "@/schema/CreateRoomSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { createRoom } from "@/server/actions/room";

export default function CreateRoom() {

    const form = useForm<z.infer<typeof CreateRoomSchema>>({
        resolver: zodResolver(CreateRoomSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async(data: z.infer<typeof CreateRoomSchema>) => {
        try {
            await createRoom(data.name);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle>Create Room</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <Input {...field} placeholder="Give it a name!" />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full h-9">Create</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}