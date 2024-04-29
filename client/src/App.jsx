import "./App.css";
import Home from "./views/home";
import AddPal from "./views/add";
import Edit from "./views/edit";
import PalDetails from "./views/palpage";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/addpal" element={<AddPal />} />{" "}
        <Route path="/pals/:id/palpage" element={<PalDetails />} />
        <Route path="/pals/:id/edit" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
