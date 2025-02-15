import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoteEditor from "./pages/NoteEditor";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="bottom-right" theme="dark" autoClose={800} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:name" element={<NoteEditor />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
