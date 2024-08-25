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
import { Toaster } from "@/components/ui/toaster";
import Submissions from "./Submissions";
function App() {
  return (
    <Router>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/test" element={<Test />} />
        <Route path="/arena/:testId" element={<Arena />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/submissions" element={<Submissions />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
