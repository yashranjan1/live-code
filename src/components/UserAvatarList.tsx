import { User } from "@prisma/client"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { MinusCircle } from "lucide-react"

type UserAvatarListProps = {
	setMembers: React.Dispatch<React.SetStateAction<User[]>>,
	members: User[]
}

export default function UserAvatarList({ setMembers, members }: UserAvatarListProps) {

    if (members.length === 0) return
		
	const removeUser = (userId: string) => {
		const newMembers = members.filter(member => member.id !== userId)
		setMembers(newMembers)
	}

    return (
        <div className="flex gap-2 w-full px-2">
            {members.map((user) => (
                <div key={user.id} className="flex flex-1 items-center gap-2">
					<div className="flex-1 flex items-center gap-2">
						<Avatar className="size-8">
							<AvatarImage src={user.image ?? ""} />
							<AvatarFallback>{user.name!.charAt(0)}</AvatarFallback>
						</Avatar>
						<h1>{user.name}</h1>
					</div>
					<button onClick={() => removeUser(user.id)} type="button">
						 <MinusCircle className="w-4 h-4" />
					</button>
				</div>
            ))}
        </div>
    )

}
