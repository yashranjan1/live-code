"use client"

import { Providers } from "@/app/_components/Providers";
import { Room } from "@/app/_components/Room";
import { CodeEditor } from "@/components/CodeEditor";
import { useParams } from "next/navigation";

export default function LiveRoom() {
    
    const { roomId } = useParams();

    return (
        <div className="flex flex-col gap-4 flex-1 w-full">
            <Providers>
                <Room roomId={roomId as string}>
                    <CodeEditor />
                </Room>
            </Providers>
        </div>
    );
}