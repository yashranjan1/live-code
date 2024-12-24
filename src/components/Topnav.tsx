"use client";
import { useSession } from "next-auth/react"
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { signOut } from "next-auth/react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useTheme } from "next-themes";

export default function Topnav() {

    const { data: session } = useSession()

    const { theme, setTheme } = useTheme()

    return (
        <nav className="flex items-center">
            <div className="flex-1">
                <Link href="/" className="mr-2 text-4xl font-bold">/LC</Link>
            </div>
            <div>
                {
                    session?.user && (

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage src={session.user.image as string} />
                                    <AvatarFallback>{(session.user.name as string).charAt(0) }</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                        <DropdownMenuContent className="min-w-fit" align="end">
                            <DropdownMenuGroup>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        <span>Dark Mode</span>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                                                <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
                                            </DropdownMenuRadioGroup>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={signOut}>
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
            {
                !session?.user && (
                    <Link href="/sign-in" className="ml-2 text-sm font-medium">Sign in</Link>
                )
            }
        </div>
    </nav>
    )
  
}