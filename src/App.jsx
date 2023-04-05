import "./App.scss";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import ViewPage from "./pages/ViewPage/ViewPage";
import CreateEditPage from "./pages/CreateEditPage/CreateEditPage";
import PlaytestPage from "./pages/PlaytestPage/PlaytestPage";
import NavBar from "./components/NavBar/NavBar";
import Credits from "./pages/Credits/Credits.jsx"

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/" element={<ViewPage />} />
        <Route path="/create" element={<CreateEditPage />} />
        <Route path="/edit/:deckID" element={<CreateEditPage />} />
        <Route path="/playtest" element={<PlaytestPage />} />
        <Route path="/credits" element={<Credits />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
 