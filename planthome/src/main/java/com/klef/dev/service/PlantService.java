package com.klef.dev.service;

import java.util.List;
import com.klef.dev.model.Plant;

public interface PlantService {
    Plant addPlant(Plant plant);
    List<Plant> getAllPlants();
    Plant getPlantById(int id);
    Plant updatePlant(int id, Plant plant);
    void deletePlant(int id);
}
