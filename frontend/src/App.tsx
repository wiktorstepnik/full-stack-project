import './App.css'
import HomePage from "./pages/HomePage.tsx";
import {AxiosProvider} from "./context/AxiosProvider.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            staleTime: 1000 * 60 * 5,
        }
    }
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>

            <AxiosProvider>
                <HomePage/>
            </AxiosProvider>
        </QueryClientProvider>

    )
}

export default App
