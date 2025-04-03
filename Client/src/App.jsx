import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/appRouter";
import { UserProvider } from "./contexts/UserContext"; // Import UserProvider

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
