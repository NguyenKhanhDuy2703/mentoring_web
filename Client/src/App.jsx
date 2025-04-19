import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/appRouter";
import  {store} from "../src/store/store.js"
import { Provider } from "react-redux";
function App() {
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
