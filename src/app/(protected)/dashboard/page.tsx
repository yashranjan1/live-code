"use client"

import RoomCard from "@/app/_components/RoomCard";
import { deleteRoom } from "@/server/actions/room";
import { getUserRooms } from "@/server/actions/room/get";
import { RoomData } from "@liveblocks/node";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function Dashboard() {

    const noRooms: RoomData[] = [];

    const { data: rooms, isLoading, error, isFetching } = useQuery({
        queryFn: getUserRooms,
        queryKey: ["rooms"],
    });
    
    if (error) {
        toast.error("Failed to fetch rooms", {
            description: "An error occured while fetching your rooms, please try again later",
        });
    }

    return (
        <div className="flex flex-col gap-4 p-4 h-full w-full">
            <RoomCard rooms={rooms?.data ?? noRooms} isFetching={isLoading || isFetching} />
        </div>
    );
}