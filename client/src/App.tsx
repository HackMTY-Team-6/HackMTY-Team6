import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import RoutesAvailable from "./components/RoutesAvailable";
import "./App.css";
import UserProvider from "./components/UserContext";

const queryClient = new QueryClient();

function App() {

  return (
    <div>
      <QueryClientProvider client={queryClient}>
          <UserProvider>
            <BrowserRouter>
              <RoutesAvailable />
            </BrowserRouter>
          </UserProvider>
        </QueryClientProvider>
    </div>
  )
}

export default App
