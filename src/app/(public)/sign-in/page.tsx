import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "@/server/auth";
import Image from "next/image";

export default function SignIn() {
	return (
		<Card className="flex flex-col items-center justify-center gap-4 p-4">
			<CardHeader>
				<CardTitle className="text-center">Sign in</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col items-center justify-center gap-3 p-4">
				<form action={async() => {
					"use server"

					await signIn("github")

				}}>
					<Button 
						type="submit"
						variant="outline"
						className="bg-black flex gap-3 px-4 py-2 text-white w-52"
					>
						<Image
							src="https://utfs.io/a/zzhaqm5h82/o5pu0HejsNJBV8vBJCouEOcW4h0SUTMe6PtZndQqagvH7xRC"
							alt="Github Logo"
							width={20}
							height={20}
						/>
						<span>
							Sign in with Github
						</span>
					</Button>
				</form>
				<form action={async () => {
					"use server"

					await signIn("discord")

				}}>
					<Button 
						type="submit"
						variant="outline"
						className="bg-black flex items-center gap-3 px-4 py-2 text-white w-52"
					>
						<Image
							src="https://utfs.io/a/zzhaqm5h82/o5pu0HejsNJB7401ygwHilfsBomY5d9NCQPeaIkO1bZcMDU2"
							alt="Github Logo"
							width={20}
							height={20}
						/>
						<span>
							Sign in with Discord
						</span>
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}