"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes";

export default function TopNav() {

    const { data: session } = useSession()
    const { theme, setTheme } = useTheme()
    
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
                <span className="text-4xl font-bold">/lc</span>
            </div>
            <div className="flex items-center gap-2">
                {
                    session && session.user && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Avatar>
                                <AvatarImage src={session.user.image ?? ""} />
                                <AvatarFallback className="sr-only">{session.user.name}</AvatarFallback>
                            </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
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
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => signOut()}>
                                    Sign out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                }
                {
                    !session && (
                        <Link href="/sign-in" className="text-sm font-medium">Sign in</Link>
                    )
                }
            </div>
        </div>
    );
}