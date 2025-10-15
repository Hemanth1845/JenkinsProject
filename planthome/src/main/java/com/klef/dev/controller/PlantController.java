package com.klef.dev.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.klef.dev.model.Plant;
import com.klef.dev.service.PlantService;

@CrossOrigin(origins = "*") 
@RestController
@RequestMapping("/api/plants")
public class PlantController {

    @Autowired
    private PlantService plantService;
    
    @GetMapping("/")
    public String home() {
    	return "Welcome to plant nursery home";
    }

    @PostMapping("/add")
    public Plant addPlant(@RequestBody Plant plant) {
        return plantService.addPlant(plant);
    }

    @GetMapping("/all")
    public List<Plant> getAllPlants() {
        return plantService.getAllPlants();
    }

    @GetMapping("/{id}")
    public Plant getPlantById(@PathVariable int id) {
        return plantService.getPlantById(id);
    }

    @PutMapping("/update/{id}")
    public Plant updatePlant(@PathVariable int id, @RequestBody Plant plant) {
        return plantService.updatePlant(id, plant);
    }

    @DeleteMapping("/delete/{id}")
    public String deletePlant(@PathVariable int id) {
        plantService.deletePlant(id);
        return "Plant deleted successfully with ID: " + id;
    }
}
