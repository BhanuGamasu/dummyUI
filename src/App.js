import Home from "./Home";
import Create from "./Create";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Home />

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<Create />} />
        </Routes>

        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
