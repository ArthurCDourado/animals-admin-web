import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createAnimal, getAnimals, changeStatus } from "../backend/api"
import { QUERY_KEYS } from "./queryKeys"

export const useCreateAnimal = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (animal: any) => createAnimal(animal),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ANIMALS]
            })
        },
    })
}

export const useChangeStatus = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ animalId, status }: { animalId: number, status: string }) => changeStatus(animalId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ANIMALS]
            })
        },
    })
}

export const useGetAnimals = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ANIMALS],
        queryFn: getAnimals
    })
}