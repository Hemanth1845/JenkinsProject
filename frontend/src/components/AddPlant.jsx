import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CONFIG from "../config";

export default function AddPlant() {
  const [plant, setPlant] = useState({
    plantName: "",
    plantType: "",
    plantOrigin: "",
    plantPrice: "",
    plantStock: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const PLANTS_API = `${CONFIG.BASE_URL}/api/plants`;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlant((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const res = await axios.post(`${PLANTS_API}/add`, plant, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.status >= 200 && res.status < 300) {
        setMessage("🌼 Plant added successfully!");
        setPlant({
          plantName: "",
          plantType: "",
          plantOrigin: "",
          plantPrice: "",
          plantStock: "",
          description: "",
        });
        setTimeout(() => navigate("/"), 700);
      } else {
        setMessage("Failed to add plant. Server returned " + res.status);
      }
    } catch (err) {
      console.error("Add plant error:", err);
      setMessage("Error connecting to server. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>🌼 Add New Plant</h3>
      <form onSubmit={handleSubmit} className="form">
        <input name="plantName" placeholder="Plant Name" value={plant.plantName} onChange={handleChange} required />
        <input name="plantType" placeholder="Plant Type" value={plant.plantType} onChange={handleChange} required />
        <input name="plantOrigin" placeholder="Plant Origin" value={plant.plantOrigin} onChange={handleChange} />
        <input name="plantPrice" type="number" placeholder="Price" value={plant.plantPrice} onChange={handleChange} required min="0" />
        <input name="plantStock" type="number" placeholder="Stock" value={plant.plantStock} onChange={handleChange} required min="0" />
        <textarea name="description" placeholder="Description" value={plant.description} onChange={handleChange} />
        <button type="submit" className="btn add" disabled={loading}>
          {loading ? "Adding..." : "Add Plant"}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
