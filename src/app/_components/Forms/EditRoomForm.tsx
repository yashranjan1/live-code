"use client"

import { z } from "zod";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, MinusCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { CreateRoomSchema } from "@/schema/CreateRoomSchema";
import { getRoomById } from "@/server/actions/room";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getUserList } from "@/server/actions/user";
import { useParams, useRouter } from "next/navigation";
import UserAvatarList from "@/components/UserAvatarList"
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useEditRoom } from "@/hooks/useEditRoom";


export default function EditRoomForm(){    

    const form = useForm<z.infer<typeof CreateRoomSchema>>({
        defaultValues: {
            name: "",
            members: [],
        }
    });
    
    const router = useRouter()
    const { mutate, isPending } = useEditRoom();

    const { roomId } = useParams<{ roomId: string }>();
    const [members, setMembers] = useState<User[]>([])

    const { setValue } = form

    useEffect(() => {
        setValue("members", members.map(member => member.id))
    }, [members])

    const { data: roomData, isLoading: isLoadingRooms, error: errorRooms } = useQuery({
        queryFn: async () => {
            const roomData = await getRoomById(roomId)
            if (roomData instanceof Error) return roomData
            setValue("name", roomData.room.id)
            setMembers(roomData.users)
            return roomData;
        },
        queryKey: ["get_rooms"],
    });
    
    const { data: users, isLoading: isLoadingUsers, error: errorUsers} = useQuery({
        queryKey: ["users"],
        queryFn: getUserList,
    });

    useEffect(() => {
        setValue("members", members.map(member => member.id))
    }, [members])
   
    
    if (errorUsers|| errorRooms || roomData instanceof Error){
        toast.error("Error", {
            description: "There was an error loading the information required by this page"
        })
        router.push("/dashboard")
        return null
    }
    
    if (isLoadingUsers || isLoadingRooms){
        return <Loader2 className="w-6 h-6 animate-spin"/>
    }
    
    
    const onSubmit = async (data: z.infer<typeof CreateRoomSchema>) => {
        mutate({
            roomId: data.name,
            members: data.members
        });
    }
    
    return (
        <Form {...form}>
            <form className="flex flex-col gap-4 w-full" onSubmit={form.handleSubmit(onSubmit)}>
                <FormLabel>Members</FormLabel>
				<Select onValueChange={(value) => {
                    const newMember = users?.filter(user => 
                        user.id === value && !members.some(member => member.id === user.id)
                    ) || []; 
                    setMembers(prevMembers => [...prevMembers, ...newMember])
                    console.log(newMember)
                }}>
					<SelectTrigger>
						<SelectValue placeholder="Add more members"/>
					</SelectTrigger>
					<SelectContent>
						{
							users?.map( user => (
								<SelectItem value={user.id} className="flex justify-start" key={user.id}>
									<div className="flex items-center gap-2 justify-start">
										<Avatar className="size-8">
											<AvatarImage src={user.image!}  />
											<AvatarFallback>{user.name!.charAt(0).toUpperCase()}</AvatarFallback>
										</Avatar>
                                        <h1>{user.name}</h1>
                                    </div>
								</SelectItem>
							))
						}
					</SelectContent>
				</Select>
               <UserAvatarList setMembers={setMembers} members={members} /> 
               <Button className="w-full h-9 mt-3" disabled={isPending}>
                    {
                        isPending ?
                        <Loader2 className="w-6 h-6 animate-spin" /> :
                        <h1>Save</h1>
                    }
               </Button>

            </form>
        </Form>
    )
}
