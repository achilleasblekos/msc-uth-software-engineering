package com.uth.recipe_management_api.recipe.service;

import com.uth.recipe_management_api.ingredient.entity.Ingredient;
import com.uth.recipe_management_api.ingredient.repository.IngredientRepository;
import com.uth.recipe_management_api.recipe.entity.Recipe;
import com.uth.recipe_management_api.recipe.entity.RecipeIngredient;
import com.uth.recipe_management_api.recipe.repository.RecipeIngredientRepository;
import com.uth.recipe_management_api.recipe.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeIngredientService {

    private final RecipeIngredientRepository recipeIngredientRepository;
    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;
    @Autowired
    public RecipeIngredientService(RecipeIngredientRepository recipeIngredientRepository,RecipeRepository recipeRepository,IngredientRepository ingredientRepository) {
        this.recipeIngredientRepository = recipeIngredientRepository;
        this.recipeRepository = recipeRepository;
        this.ingredientRepository=ingredientRepository;
    }


    public RecipeIngredient createRecipeIngredient(RecipeIngredient recipeIngredient) {
        return recipeIngredientRepository.save(recipeIngredient);
    }

    public List<RecipeIngredient> getAllRecipeIngredients() {
        return recipeIngredientRepository.findAll();
    }

    public RecipeIngredient getRecipeIngredientById(Long id) {
        return recipeIngredientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("RecipeIngredient not found"));
    }

    public List<RecipeIngredient> addRecipeIngredients(Long recipeId, List<RecipeIngredient> recipeIngredients) {

        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found with id " + recipeId));

        for (RecipeIngredient recipeIngredient : recipeIngredients) {
            recipeIngredient.setRecipe(recipe);
            recipeIngredient.setQuantity(recipeIngredient.getQuantity());
            recipeIngredient.setUnit(recipeIngredient.getUnit());
            Ingredient ingr = new Ingredient();
            Ingredient ingrNew;
            ingr.setName(recipeIngredient.getIngredient().getName());
            ingrNew =ingredientRepository.save(ingr);

            recipeIngredient.setIngredient(ingrNew);
        }

        recipeIngredientRepository.saveAll(recipeIngredients);
        return recipeIngredients;
    }

    public void deleteRecipeIngredient(Long id) {

        RecipeIngredient existingRecipeIngredient = recipeIngredientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("recipeIngredientRepository not found with id " + id));
        recipeIngredientRepository.delete(existingRecipeIngredient);

    }

    public RecipeIngredient updateRecipeIngredient(Long id, RecipeIngredient updatedRecipeIngredient) {

        RecipeIngredient existingRecipeIngredient= recipeIngredientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("RecipeIngredient not found with id " + id));
        Ingredient existingIngredient= ingredientRepository.findById(updatedRecipeIngredient.getIngredient().getId())
                .orElseThrow(() -> new RuntimeException("Ingredient not found with id " + updatedRecipeIngredient.getIngredient().getId()));
        existingIngredient.setName(updatedRecipeIngredient.getIngredient().getName());
        Ingredient ingr = ingredientRepository.save(existingIngredient);
        existingRecipeIngredient.setIngredient(ingr);
        existingRecipeIngredient.setUnit(updatedRecipeIngredient.getUnit());
        existingRecipeIngredient.setQuantity(updatedRecipeIngredient.getQuantity());

        return recipeIngredientRepository.save(existingRecipeIngredient);
    }
}
