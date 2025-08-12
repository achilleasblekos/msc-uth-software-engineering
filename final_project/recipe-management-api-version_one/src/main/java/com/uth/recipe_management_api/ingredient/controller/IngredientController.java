package com.uth.recipe_management_api.ingredient.controller;

import com.uth.recipe_management_api.ingredient.entity.Ingredient;
import com.uth.recipe_management_api.ingredient.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ingredients")
public class IngredientController {
    private final IngredientService ingredientService;

    @Autowired
    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @PostMapping
    public Ingredient createIngredient(@RequestBody Ingredient ingredient) {
        return ingredientService.createIngredient(ingredient);
    }

    @GetMapping("/all")
    public List<Ingredient> getAllIngredients() {
        List<Ingredient> redf = ingredientService.getAllIngredient();
        return redf;
    }

    @GetMapping("/{id}")
    public Ingredient getIngredientById(@PathVariable Long id) {
        return ingredientService.getIngredientById(id);
    }

}
