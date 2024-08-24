import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Navbar from "./components/Navbar";
import Signin from "./Signin";
import Signup from "./Signup";
import Footer from "./components/Footer";
import Tests from "./Tests";
import Test from "./Test";
import Arena from "./Arena";
import Upload from "./Upload";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/test" element={<Test />} />
        <Route path="/arena" element={<Arena />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
