import { RoomData } from "@liveblocks/node";
import { User } from "@prisma/client";

export enum RoomAccessTypes {
    READ = "room:read",
    WRITE = "room:write",
}
    
export interface RoomUserData {
    room: RoomData,
    users: User[]
}