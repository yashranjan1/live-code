import { useDeleteRoom } from "@/hooks";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2, Menu, PlusCircle } from "lucide-react";
import Link from "next/link";
import { RoomData } from "@liveblocks/node";

type RoomCardProps = {
    isFetching: boolean,
    rooms: RoomData[]
}

export default function RoomCard({
    isFetching,
    rooms,
}: RoomCardProps ){
    
    const { mutate, isPending } = useDeleteRoom();
    
    const handleRoomDelete = async (roomId: string) => {
        mutate(roomId);
    }
    
    return (
        <Card className="w-72 h-96 flex flex-col">
        <CardHeader className="flex flex-row items-center">
            <CardTitle className="flex-1">Rooms</CardTitle>
            <Link href="/live/create">
                <PlusCircle className="h-6 w-6" />
            </Link>
        </CardHeader>
        <CardContent className="flex flex-col flex-1"> 
            {
                // if still fetching the rooms show the loader
                isFetching &&
                <div className="flex flex-col items-center justify-center gap-4 flex-1 mb-10">
                    <Loader2 className="h-6 w-6 animate-spin" />
                </div>
            }
            {  
                // if we are not fetching the rooms and go a len that is greater than 0
                !isFetching && rooms.length > 0 &&
                <>
                    <Separator />
                    <ScrollArea className="h-full">
                        {
                            rooms.map((room) => (
                                <div key={room.id} className="py-3 flex flex-col gap-3">
                                    <div className="flex flex-row items-center gap-4 px-1">
                                        <Link className={isPending ? "pointer-events-none flex-1" : "flex-1"} href={`/live/${room.id}`}>
                                            <div>{room.id}</div>
                                        </Link>
                                        { !isPending &&
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <Menu className="h-5" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <Link href={`/live/${room.id}`} className="cursor-pointer">
                                                        <DropdownMenuItem>
                                                            <Button variant="link" className="p-0 h-full w-full hover:no-underline justify-start font-normal">
                                                                Join
                                                            </Button>
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <Link href={`/live/edit/${room.id}`} className="cursor-pointer">
                                                        <DropdownMenuItem>
                                                            <Button variant="link" className="p-0 h-full w-full hover:no-underline justify-start font-normal">
                                                                Manage 
                                                            </Button>
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <DropdownMenuItem>
                                                        <Button variant="link" className="p-0 h-full w-full hover:no-underline justify-start font-normal text-red-500 dark:text-red-800" onClick={async () => {
                                                            handleRoomDelete(room.id); 
                                                        }}>
                                                            Delete
                                                        </Button>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent> 
                                            </DropdownMenu>
                                        }
                                        {
                                            isPending &&
                                            <Loader2 className="h-6 w-6 animate-spin" />
                                        }
                                    </div>
                                    <Separator />
                                </div>
                            ))
                        }
                    </ScrollArea>
                </>
            }
            {
                // if we found the rooms and couldn't get a single one from the server
                // could be a lack of rooms or a server side error  
                !isFetching && rooms.length === 0 &&

                <div className="flex flex-col items-center justify-center gap-4 flex-1 mb-10">
                    <span>No rooms found</span>
                </div>

            }
        </CardContent>
    </Card>
    )
}