import "./App.css";
import Service from "./screens/Service";
import About from "./screens/About";
import Guide from "./screens/Guide";
import Media from "./screens/Media";
import Notice from "./screens/Notice";
import Faq from "./screens/Faq";
import Mypage from "./screens/Mypage";
import Login from "./screens/Login";
import Register from "./screens/Register";
import NavBarElement from "./components/NavBarElement";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBarElement />
      <Routes>
        <Route path="/" element={<Service />} />
        <Route path="/Service" element={<Service />} />
        <Route path="/About" element={<About />} />
        <Route path="/Guide" element={<Guide />} />
        <Route path="/Media" element={<Media />} />
        <Route path="/Notice" element={<Notice />} />
        <Route path="/Faq" element={<Faq />} />
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
