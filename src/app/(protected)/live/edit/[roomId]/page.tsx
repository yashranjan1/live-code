import EditRoomForm from "@/app/_components/Forms/EditRoomForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EditRoomPage() {

    
    
    return (
        <Card className="py-10 px-5 flex flex-col p-4 w-80 h-96">
            <CardHeader>
                <CardTitle className="text-center"> 
                    Edit Room
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 justify-center items-center">
                <EditRoomForm />
            </CardContent>
        </Card>
    )
}