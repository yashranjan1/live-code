"use client";

import { ReactNode } from "react";
import { RoomProvider } from "@liveblocks/react/suspense";
import { ClientSideSuspense } from "@liveblocks/react";
import { Loader2 } from "lucide-react";

interface RoomParams {
    roomId: string;
    children: ReactNode;
}

export function Room({ children, roomId }: RoomParams) {

    return (
        <RoomProvider
            id={roomId}
            initialPresence={{
                cursor: null,
            }}
        >
            <ClientSideSuspense fallback={
                <div className="flex h-full w-full items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin mb-10" />
                </div>
            }>
                {children}
            </ClientSideSuspense>
        </RoomProvider>
    );
}
