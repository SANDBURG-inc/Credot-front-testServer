import Service from "./screens/Service";
import About from "./screens/About";
import Guide from "./screens/Guide";
import Media from "./screens/Media";
import Notice from "./screens/Notice";
import Faq from "./screens/Faq";
import Inquiry from "./screens/Inquiry";
import Mypage from "./screens/Mypage";
import Login from "./screens/Login";
import Finance from "./screens/Finance";
import Register from "./screens/Register";
import NavBarElement from "./components/NavBarElement";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBarElement />
        <Routes>
          <Route path="/" element={<Service />} />
          <Route path="/Service" element={<Service />} />
          <Route path="/About" element={<About />} />
          <Route path="/Guide" element={<Guide />} />
          <Route path="/Media" element={<Media />} />
          <Route path="/Notice" element={<Notice />} />
          <Route path="/Faq" element={<Faq />} />
          <Route path="/Inquiry" element={<Inquiry />} />
          <Route path="/Mypage" element={<Mypage />} />
          <Route path="/Finance" element={<Finance />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
