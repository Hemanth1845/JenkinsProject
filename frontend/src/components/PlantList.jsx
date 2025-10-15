import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CONFIG from "../config";
import "./PlantList.css";

export default function PlantList() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const PLANTS_API = `${CONFIG.BASE_URL}/api/plants`;

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${PLANTS_API}/all`);
      console.log("API Response:", res.data);
      if (Array.isArray(res.data)) {
        setPlants(res.data);
      } else {
        console.warn("Unexpected response format:", res.data);
        setPlants([]);
        setError("Unexpected response format from server.");
      }
    } catch (err) {
      console.error("Fetch plants error:", err);
      setError("Failed to load plants. Check backend URL or server.");
      setPlants([]);
    } finally {
      setLoading(false);
    }
  };

  const deletePlant = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plant?")) return;
    try {
      await axios.delete(`${PLANTS_API}/delete/${id}`);
      setPlants((prev) => prev.filter((p) => p.plantId !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete plant.");
    }
  };

  if (loading) return <p className="loading">🌿 Loading plants...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="card">
      <h3>🌿 Plant List</h3>
      {plants.length === 0 ? (
        <div className="no-data">No plants found. Add some plants →</div>
      ) : (
        <table className="plant-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Plant Name</th>
              <th>Type</th>
              <th>Origin</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plants.map((p) => (
              <tr key={p.plantId}>
                <td>{p.plantId}</td>
                <td>{p.plantName}</td>
                <td>{p.plantType}</td>
                <td>{p.plantOrigin}</td>
                <td>₹{p.plantPrice}</td>
                <td>{p.plantStock}</td>
                <td>{p.description}</td>
                <td>
                  <Link to={`/update/${p.plantId}`} className="btn edit">Edit</Link>
                  <button className="btn delete" onClick={() => deletePlant(p.plantId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
