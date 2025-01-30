
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRoom } from "@/server/actions/room";
import { redirect } from "next/navigation";
import { toast } from "sonner";


export const useEditRoom = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateRoom,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["rooms"],
            });
            toast.success("Room successfully updated")
            redirect("/")
        },
    });
};
