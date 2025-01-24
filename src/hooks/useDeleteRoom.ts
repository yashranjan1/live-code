import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRoom } from "@/server/actions/room";

export const useDeleteRoom = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteRoom,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["rooms"],
            });
        },
    });
};
