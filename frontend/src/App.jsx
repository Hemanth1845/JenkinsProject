import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PlantList from "./components/PlantList";
import AddPlant from "./components/AddPlant";
import UpdatePlant from "./components/UpdatePlant";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="navbar">
        <h2>🌱 Nursery Home</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/add">Add Plant</Link>
        </div>
      </div>

      <div className="container">
        <Routes>
          <Route path="/" element={<PlantList />} />
          <Route path="/add" element={<AddPlant />} />
          <Route path="/update/:id" element={<UpdatePlant />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
