package com.uth.recipe_management_api.recipe.controller;

// import com.uth.recipe_management_api.recipe.entity.Recipe;
import com.uth.recipe_management_api.recipe.entity.RecipeIngredient;
import com.uth.recipe_management_api.recipe.service.RecipeIngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipeingredients")
public class RecipeIngredientController {
    private final RecipeIngredientService recipeIngredientService;

    @Autowired
    public RecipeIngredientController(RecipeIngredientService recipeIngredientService) {
        this.recipeIngredientService = recipeIngredientService;
    }

    @PostMapping
    public RecipeIngredient createRecipeIngredient(@RequestBody RecipeIngredient recipeIngredient) {
        return recipeIngredientService.createRecipeIngredient(recipeIngredient);
    }

    @GetMapping("/all")
    public List<RecipeIngredient> getAllRecipeIngredients() {
        return recipeIngredientService.getAllRecipeIngredients();
    }

    @GetMapping("/{id}")
    public RecipeIngredient getRecipeIngredientById(@PathVariable Long id) {
        return recipeIngredientService.getRecipeIngredientById(id);
    }
    @PostMapping("/ingredients/{recipeId}")
    public List<RecipeIngredient> addRecipeIngredients(
            @PathVariable Long recipeId,
            @RequestBody List<RecipeIngredient> recipeIngredients) {
        return recipeIngredientService.addRecipeIngredients(recipeId, recipeIngredients);
    }

    @DeleteMapping("/{id}")
    public void deleteRecipeIngredient(@PathVariable Long id) {
        recipeIngredientService.deleteRecipeIngredient(id);
    }

    @PutMapping("/{id}")
    public RecipeIngredient updateRRecipeIngredient(@PathVariable Long id, @RequestBody RecipeIngredient recipeIngredient) {
        return recipeIngredientService.updateRecipeIngredient(id, recipeIngredient);
    }
}
