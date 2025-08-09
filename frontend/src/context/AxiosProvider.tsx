import {createContext, type ReactNode, useContext} from "react";
import axios, {type AxiosInstance} from "axios";

interface AxiosContextValue {
    client: AxiosInstance;
}

const AxiosContext = createContext<AxiosContextValue | undefined>(undefined);

export const AxiosProvider = ({children}: { children: ReactNode }) => {
    const client = axios.create({
        baseURL: "http://localhost:8000",
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
        },
    });

    return (
        <AxiosContext.Provider value={{client}}>
            {children}
        </AxiosContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAxios = (): AxiosInstance => {
    const context = useContext(AxiosContext);
    if (!context) {
        throw new Error("useAxios must be used within an AxiosProvider");
    }
    return context.client;
};
