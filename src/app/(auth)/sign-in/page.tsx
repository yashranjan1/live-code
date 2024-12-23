import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function Page() {
	return (
		<div className="flex flex-col items-center justify-center gap-4 p-4">
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl text-center">Sign In</CardTitle>
				</CardHeader>
				<CardContent>

				</CardContent>
				<CardFooter>
					<Button>
						<Image 
							src="https://utfs.io/a/zzhaqm5h82/o5pu0HejsNJB7401ygwHilfsBomY5d9NCQPeaIkO1bZcMDU2" 
							alt="Discord Logo" 
							width={18} 
							height={18}
							className="text-discord-blue"
							/>
						Sign In With Discord
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}