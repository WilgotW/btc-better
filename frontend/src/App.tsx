import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import About from "./pages/About/About";

function App() {
  return (
    <div className="h-[100vh] overflow-y-hidden bg-background">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
