import type {AxiosInstance} from "axios";
import type {User} from "../interfaces/user.ts";
import {useQuery} from "@tanstack/react-query";
import {useAxios} from "../context/AxiosProvider.tsx";

const fetchUsers = async (axiosClient: AxiosInstance): Promise<User[]> => {
    const response = await axiosClient.get<User[]>("/v1/users");
    return response.data;
};

const fetchUser = async (axiosClient: AxiosInstance, id: number): Promise<User> => {
    const response = await axiosClient.get<User>(`/v1/users/${id}`);
    return response.data;
};

export const useUsers = () => {
    const axiosClient = useAxios();
    return useQuery<User[]>({
        queryKey: ["users"],
        queryFn: () => fetchUsers(axiosClient),
    });
};

export const useUser = (id: number | null) => {
    const axiosClient = useAxios();
    return useQuery<User>({
        queryKey: ["user", id],
        queryFn: () => fetchUser(axiosClient, id!),
        enabled: !!id
    });
};

