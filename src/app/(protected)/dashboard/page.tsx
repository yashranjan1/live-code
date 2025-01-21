import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-4 p-4 h-full w-full">
            <Card className="w-72">
                <CardHeader className="flex flex-row items-center">
                    <CardTitle className="flex-1">Rooms</CardTitle>
                    <Link href="/live/create">
                        <PlusCircle className="h-6 w-6" />
                    </Link>
                </CardHeader>
                <CardContent>
                    
                </CardContent>
            </Card>
        </div>
    );
}