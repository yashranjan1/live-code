"use client"

import RoomCard from "@/app/_components/RoomCard";
import { getUserRooms } from "@/server/actions/room/get";
import { RoomData } from "@liveblocks/node";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Dashboard() {
    
    const [rooms, setRooms] = useState<RoomData[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    useEffect(() => {
        const getRooms = async() => {
            setIsFetching(true);
            try {
                const rooms = await getUserRooms();
                setRooms(rooms.data);
            }
            catch (error) {
                toast.error("Failed to fetch rooms", {
                    description: "An error occured while fetching your rooms, please try again later",
                });
            }
            finally {
                setIsFetching(false);
            }
        };
        getRooms();
    }, []);

    return (
        <div className="flex flex-col gap-4 p-4 h-full w-full">
            <RoomCard rooms={rooms} isFetching={isFetching} />
        </div>
    );
}