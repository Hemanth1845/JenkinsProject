package com.klef.dev.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.dev.model.Plant;
import com.klef.dev.repository.PlantRepository;

@Service
public class PlantServiceImpl implements PlantService {

    @Autowired
    private PlantRepository plantRepository;

    @Override
    public Plant addPlant(Plant plant) {
        return plantRepository.save(plant);
    }

    @Override
    public List<Plant> getAllPlants() {
        return plantRepository.findAll();
    }

    @Override
    public Plant getPlantById(int id) {
        Optional<Plant> plant = plantRepository.findById(id);
        return plant.orElse(null);
    }

    @Override
    public Plant updatePlant(int id, Plant plantDetails) {
        Plant existing = getPlantById(id);
        if (existing != null) {
            existing.setPlantName(plantDetails.getPlantName());
            existing.setPlantType(plantDetails.getPlantType());
            existing.setPlantOrigin(plantDetails.getPlantOrigin());
            existing.setPlantPrice(plantDetails.getPlantPrice());
            existing.setPlantStock(plantDetails.getPlantStock());
            existing.setDescription(plantDetails.getDescription());
            return plantRepository.save(existing);
        }
        return null;
    }

    @Override
    public void deletePlant(int id) {
        plantRepository.deleteById(id);
    }
}
