import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/server/auth";
import { providerMap } from "@/server/auth/config";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { iconLookup } from "@/lib/icon-lookup";
import AltImage from "@/app/_components/image";

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
				<CardContent className="flex flex-col gap-2">
					{ 
                    Object.values(providerMap).map((provider) => (
						<form
                            key={provider.id}
                            className="w-full"
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
								<AltImage
									defaultSrc={iconLookup[provider.name]!.dark}
									alternateSrc={iconLookup[provider.name]!.light}
									alt={`${provider.name}-icon`}
								/>
								<span>Sign in with {provider.name}</span>
							</Button>
						</form>
				))}
                </CardContent>
			</Card>
		</div>
	);
}
