import "./App.css";
import Home from "./views/home";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        {/* <Route path="/books/:id/details" element={<BookDetails />} />
        <Route path="/create" element={<Create />} />
        <Route path="/books/:id/update" element={<Update />} /> */}
      </Routes>
    </>
  );
}

export default App;
