"use client"

import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateRoomSchema } from "@/schema/CreateRoomSchema";
import { getRoomById } from "@/server/actions/room";
import { useQuery } from "@tanstack/react-query";
import { Loader2, MinusCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getUserList } from "@/server/actions/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectTrigger, SelectItem } from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function EditRoomPage() {

    const { roomId } = useParams<{ roomId: string }>();

    const { data: room, isLoading: isLoadingRooms, error: errorRooms } = useQuery({
        queryFn: async () => {
            const room = await getRoomById(roomId)
            setValue("name", room.id);
            setMemberList(Object.keys(room.usersAccesses));
            return room;
        },
        queryKey: ["get_rooms"],
    });
    
    const [memberList, setMemberList] = useState<string[]>([]);

    if(errorRooms) {
        toast.error("Failed to fetch room", {
            description: "An error occured while fetching your room, please try again later",
        });
    }
    
    const { data: users, isLoading: isLoadingUsers, error: errorUsers } = useQuery({
        queryKey: ["users"],
        queryFn: () => getUserList(),
    });
    
    if(errorUsers) {
        toast.error("Failed to fetch users", {
            description: "An error occured while fetching your users, please try again later",
        });
    }
    
    const form = useForm<z.infer<typeof CreateRoomSchema>>({
        defaultValues: {
            name: "",
            members: [],
        }
    });
    
    const { setValue, getValues } = form
    
    const removeMember = (userId: string) => {
        setValue("members", getValues("members").filter((member) => member !== userId));
    }
    
    const addMember = (userId: string) => {
        setValue("members", [...getValues("members"), userId]);
    }
    
    useEffect(() => {
        setValue("members", memberList);
    }, [memberList]);
    
    return (
        <Card className="py-10 px-5 flex flex-col p-4">
            <CardHeader>
                <CardTitle className="text-center"> 
                    Edit Room
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 justify-center items-center">
                {
                    !isLoadingRooms && room &&
                    <Form {...form}>
                        <form onSubmit={() => {}} className="space-y-5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Room Name</FormLabel>
                                        <Input
                                            {...field}
                                        />
                                    </FormItem>
                                )}
                            />
                            <Select>
                                <SelectTrigger className="w-full">Add more members!</SelectTrigger>
                                <SelectContent>
                                    {
                                        isLoadingUsers &&
                                        <SelectItem disabled value="loading">
                                            <Loader2 className="h-6 w-6 animate-spin" />
                                        </SelectItem>
                                    }
                                    {
                                        !isLoadingUsers && users?.length === 0 &&
                                        <SelectItem disabled value="no-users">
                                            <span>No users found</span>
                                        </SelectItem>
                                    }
                                    {
                                        !isLoadingUsers && users?.length! > 0 &&
                                        users!.map((user) => (
                                            <SelectItem key={user.id} value={user.id} onClick={() => {
                                                addMember(user.id);
                                            }}>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="size-8">
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
                            {
                                !isLoadingUsers && memberList.length > 0 &&
                                <div className="flex flex-col gap-5">
                                    {   
                                        users &&
                                        users.filter((user) => memberList.includes(user.id)).map((user) => (
                                            <div key={user.id} className="flex items-center gap-3">
                                                <div className="flex-1 flex items-center gap-2 px-2">
                                                    <div className="flex items-center gap-3 flex-1">
                                                        <Avatar className="size-9">
                                                            <AvatarImage src={user.image ?? ""}  />
                                                            <AvatarFallback>{user.name?.toUpperCase()[-1]}</AvatarFallback>
                                                        </Avatar>
                                                        <span>{user.name}</span>
                                                    </div>
                                                    <Button variant="ghost" type="button" onClick={() => {
                                                        removeMember(user.id);
                                                    }}>
                                                        <MinusCircle className="h-7 w-6" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))
                                    } 
                                </div>
                            }
                            {
                                isLoadingRooms || isLoadingUsers &&
                                <Loader2 className="h-6 w-6 animate-spin mb-8" />
                            }
                        </form>
                    </Form>
                }
            </CardContent>
        </Card>
    )
}