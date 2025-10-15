import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CONFIG from "../config";

const UpdatePlant = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState({
    plantName: "",
    plantType: "",
    plantOrigin: "",
    plantPrice: "",
    plantStock: "",
    description: "",
  });

  const API_URL = `${CONFIG.BASE_URL}/api/plants`;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/${id}`)
      .then((res) => setPlant(res.data))
      .catch(err => {
        console.error("Error fetching plant:", err);
        alert("Error loading plant data");
      });
  }, [id, API_URL]);

  const handleChange = (e) => {
    setPlant({ ...plant, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/update/${id}`, plant);
      alert("Plant updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating plant:", error);
      alert("Error updating plant");
    }
  };

  return (
    <div className="card">
      <h3>🌻 Update Plant</h3>
      <form onSubmit={handleSubmit}>
        <input name="plantName" value={plant.plantName || ""} onChange={handleChange} placeholder="Plant Name" required />
        <input name="plantType" value={plant.plantType || ""} onChange={handleChange} placeholder="Plant Type" required />
        <input name="plantOrigin" value={plant.plantOrigin || ""} onChange={handleChange} placeholder="Plant Origin" />
        <input name="plantPrice" type="number" value={plant.plantPrice || ""} onChange={handleChange} placeholder="Price" required />
        <input name="plantStock" type="number" value={plant.plantStock || ""} onChange={handleChange} placeholder="Stock" required />
        <textarea name="description" value={plant.description || ""} onChange={handleChange} placeholder="Description"></textarea>
        <button type="submit" className="btn update">Update Plant</button>
      </form>
    </div>
  );
};

export default UpdatePlant;
