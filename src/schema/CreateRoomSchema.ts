import { z } from "zod";

export const CreateRoomSchema = z.object({
    name: z.string(),
    members: z.array(z.string()).min(0),
});