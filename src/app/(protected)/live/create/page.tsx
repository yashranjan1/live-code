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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { createRoom } from "@/server/actions/room";
import { getUserList } from "@/server/actions/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, MinusCircle, PlusCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateRoom() {

    const router = useRouter();
    const queryClient = useQueryClient();

    const { data: users, isLoading, error} = useQuery({
        queryKey: ["users"],
        queryFn: getUserList,
    });
    
    if (error) {
        toast.error("Failed to fetch users", {
            description: "An error occured while fetching your users, please try again later",
        });
    }

    const [memberList, setMemberList] = useState<string[]>([]);

    const form = useForm<z.infer<typeof CreateRoomSchema>>({
        resolver: zodResolver(CreateRoomSchema),
        defaultValues: {
            name: "",
            members: [],
        },
    });

    const { setValue } = form;
    
    useEffect(() => {
        setValue("members", memberList);
    }, [memberList]);

    const onSubmit = async(data: z.infer<typeof CreateRoomSchema>) => {
        mutate(data)
    };

    const { isPending, mutate } = useMutation({
        mutationFn: (data: z.infer<typeof CreateRoomSchema>) => createRoom(data.name, data.members),
        onSuccess: (data) => {
           router.push("/dashboard") 
           queryClient.invalidateQueries({
               queryKey: ["rooms"],
           });
           toast.success("Room created", {
               description: "Your room has been created successfully",
           });
        },
        onError: (error) => {
            toast.error("Failed to create room", {
                description: "An error occured while creating your room, please try again later",
            });
        }
    });

    return (
        <Card className="py-10 px-5 flex flex-col gap-4 w-96">
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
                        <Select onValueChange={(newMember) => {
                            setMemberList([...memberList, newMember]);
                        }}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Give Members Access!" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    isLoading &&
                                    <SelectItem disabled value="loading">
                                        <Loader2 className="h-6 w-6 animate-spin" />
                                    </SelectItem>
                                }
                                {
                                    !isLoading && users?.length === 0 &&
                                    <SelectItem disabled value="no-users">
                                        <span>No users found</span>
                                    </SelectItem>
                                }
                                {
                                    !isLoading && users?.length! > 0 &&
                                    users!.map((user) => (
                                        <SelectItem key={user.id} value={user.id}>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="size-5">
                                                    <AvatarImage src={user.image ?? ""} />
                                                    <AvatarFallback className="sr-only">{user.name}</AvatarFallback>
                                                </Avatar>
                                                <span>{user.name}</span>
                                            </div>
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                        <div className="flex flex-col gap-2">
                            {
                                memberList.map((member) => (
                                    <div key={member} className="flex items-center gap-2 pl-3">
                                        <div className="flex-1 flex items-center gap-2">
                                            <Avatar className="size-8">
                                                <AvatarImage src={users?.find((user) => user.id === member)?.image ?? ""} />
                                                <AvatarFallback className="sr-only">{users?.find((user) => user.id === member)?.name}</AvatarFallback>
                                            </Avatar>
                                            <span>{users?.find((user) => user.id === member)?.name}</span>
                                        </div>
                                        <Button onClick={() => {
                                            setMemberList(memberList.filter((m) => m !== member));
                                        }}
                                            variant={"ghost"}
                                        >
                                            <MinusCircle className="h-6 w-6" />
                                        </Button>
                                    </div>
                                ))
                            }

                        </div>
                        <Button 
                            type="submit" 
                            className="w-full h-9"
                            disabled={isPending}
                        >
                            {
                                isPending &&
                                <Loader2 className="w-6 h-6 animate-spin" />
                            }
                            {
                                !isPending &&
                                <PlusCircle className="w-6 h-6" />
                            }
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}