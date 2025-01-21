import { auth } from "@/server/auth"
import { liveblocks } from "@/lib/server/liveblocks";


export async function POST(request: Request) {
    // Get the current user from your database
    const session = await auth();

    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { id, name, color, avatar } = session.user.info; 

    // Identify the user and return the result
    const { status, body } = await liveblocks.identifyUser(
        {
            userId: id,
            groupIds: []
            
        },
        { userInfo: { name, color, avatar } },
    );

    return new Response(body, { status });
}