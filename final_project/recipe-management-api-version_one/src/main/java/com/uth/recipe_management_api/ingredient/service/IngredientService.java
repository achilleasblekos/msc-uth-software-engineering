package com.uth.recipe_management_api.ingredient.service;

import com.uth.recipe_management_api.ingredient.entity.Ingredient;
import com.uth.recipe_management_api.ingredient.repository.IngredientRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class IngredientService {
    private final IngredientRepository ingredientRepository;


    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    public Ingredient createIngredient(Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }

    public List<Ingredient> getAllIngredient() {
        return ingredientRepository.findAll();
    }

    public Ingredient getIngredientById(Long id) {
        return ingredientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ingredient not found"));
    }

}
