import { AppContextProvider } from "./context/AppContext";
import Main from "./components/Main";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

function App() {
  return (
    <AppContextProvider>
      <Main />
    </AppContextProvider>
  );
}

export default App;
