
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2, PlusCircle } from "lucide-react";
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
                                <div key={room.id}>
                                    <div className="flex flex-row items-center gap-4">
                                        <div className="flex-1">{room.id}</div>
                                        <Link href={`/live/${room.id}`}>
                                            <Button className="p-0" variant="link">
                                                Join
                                            </Button>
                                        </Link>
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