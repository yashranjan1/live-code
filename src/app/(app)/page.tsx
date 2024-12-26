import { auth } from "@/server/auth";

export default async function Page() {

    const session = await auth();

    // console.log(session)

	return (
		<div>
            {/* {
                user ? <h1>Hello {user.name}</h1> : <h1>Not logged in</h1>
            } */}
		</div>
	);
}