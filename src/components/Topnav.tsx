import Link from "next/link";

export default function Topnav() {
    return (
        <nav className="flex items-center">
            <Link href="/" className="mr-2 flex-1 text-4xl font-bold text-gray-900">/LC</Link>
            <div>
                <Link href="/sign-in" className="mr-2 flex-1 text-xl font-semibold text-gray-900 hover:underline">Sign In</Link>
            </div>
        </nav>
    )
  
}