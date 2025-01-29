
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRoom } from "@/server/actions/room";


export const useEditRoom = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateRoom,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["rooms"],
            });
        },
    });
};
