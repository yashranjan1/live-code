"use client"

import { useParams } from "next/navigation";

export default function LiveRoom() {
    
    const { roomId } = useParams();

    return (
        <div className="flex flex-col gap-4">
            <h1>{roomId}</h1>
        </div>
    );
}