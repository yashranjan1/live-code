import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { auth, signIn } from "@/server/auth";
import { providerMap } from "@/server/auth/config";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { iconLookup } from "@/lib/icon-lookup";

interface SignInFormProps {
  searchParams: { 
	callbackUrl: string
   }
}


export default async function Page(props: SignInFormProps) {

    const { callbackUrl } = await props.searchParams

	return (
		<div className="flex flex-col items-center justify-center gap-4 p-4">
			<Card>
				<CardHeader>
					<CardTitle className="text-center text-2xl">Sign In</CardTitle>
				</CardHeader>
				<CardContent></CardContent>
				<CardFooter>
					{ 
                    Object.values(providerMap).map((provider) => (
						<form
                            key={provider.id}
							action={async () => {
								"use server"
								try {
									await signIn(provider.id, {
										redirectTo: callbackUrl ?? "",
									})
									} catch (error) {
										if (error instanceof AuthError) {
											return redirect(`/`)
										}
										throw error
									}
							}}
						>
							<Button type="submit" className="w-full">
								<Image
									src={iconLookup[provider.name] as string}
									alt={provider.name}
									width={18}
									height={18}	
								/>
								<span>Sign in with {provider.name}</span>
							</Button>
						</form>
				))}
				</CardFooter>
			</Card>
		</div>
	);
}
