import { BrowserRouter, Routes, Route } from "react-router-dom";
import Carta from "./modules/carta";
import { NotFound } from "./modules/notFound";


import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Ruta sin layout (para mostrar solo la carta) */}
          <Route path="/" element={<Carta />} />

          {/* Not Found */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
