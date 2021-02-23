import { AppContextProvider } from "./context/AppContext";
import Main from "./Main";
import "./app.css";

function App() {
  return (
    <AppContextProvider>
      <Main />
    </AppContextProvider>
  );
}

export default App;
