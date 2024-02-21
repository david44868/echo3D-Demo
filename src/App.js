import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Animals from "./pages/Animals";
import Planets from "./pages/Planets";
import Random from "./pages/Random";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/animals" element={<Animals />} />
        <Route path="/planets" element={<Planets />} />
        <Route path="/random" element={<Random />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
