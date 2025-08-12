package com.uth.recipe_management_api.step.service;


import com.uth.recipe_management_api.ingredient.entity.Ingredient;
import com.uth.recipe_management_api.ingredient.repository.IngredientRepository;
// import com.uth.recipe_management_api.recipe.entity.Recipe;
// import com.uth.recipe_management_api.recipe.entity.RecipeIngredient;
import com.uth.recipe_management_api.step.entity.Step;
import com.uth.recipe_management_api.step.entity.StepIngredient;
import com.uth.recipe_management_api.step.repository.StepIngredientRepository;
import com.uth.recipe_management_api.step.repository.StepRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StepIngredientService {
    private final StepIngredientRepository stepIngredientRepository;
    private final StepRepository stepRepository;
    private final IngredientRepository ingredientRepository;

    public StepIngredientService(StepIngredientRepository stepIngredientRepository,StepRepository stepRepository,IngredientRepository ingredientRepository) {
        this.stepIngredientRepository = stepIngredientRepository;
        this.stepRepository = stepRepository;
        this.ingredientRepository = ingredientRepository;
    }

    public StepIngredient createStep(StepIngredient stepIngredient) {
        return stepIngredientRepository.save(stepIngredient);
    }

    public List<StepIngredient> getAllStepIngredient() {
        return stepIngredientRepository.findAll();
    }

    public StepIngredient getStepIngredientById(Long id) {
        return stepIngredientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("StepIngredient not found"));
    }

    public List<StepIngredient> addStepIngredients(Long stepId, List<StepIngredient> stepIngredients) {

        Step step = stepRepository.findById(stepId)
                .orElseThrow(() -> new RuntimeException("Step not found with id " + stepId));

        for (StepIngredient stepIngredient : stepIngredients) {
            stepIngredient.setStep(step);
            stepIngredient.setQuantity(stepIngredient.getQuantity());
            stepIngredient.setUnit(stepIngredient.getUnit());
            Ingredient ingr = new Ingredient();
            Ingredient ingrNew;
            ingr.setName(stepIngredient.getIngredient().getName());
            ingrNew = ingredientRepository.save(ingr);
            stepIngredient.setIngredient(stepIngredient.getIngredient());
        }
        stepIngredientRepository.saveAll(stepIngredients);

        return stepIngredients;
    }

    public void deleteStepIngredient(Long id) {

        StepIngredient existingStepIngredientt = stepIngredientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("stepIngredientRepository not found with id " + id));
        stepIngredientRepository.delete(existingStepIngredientt);

    }

    public StepIngredient updateStepIngredient(Long id, StepIngredient updatedStepIngredient) {

        StepIngredient existingStepIngredient= stepIngredientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("StepIngredient not found with id " + id));
        Ingredient existingIngredient= ingredientRepository.findById(updatedStepIngredient.getIngredient().getId())
                .orElseThrow(() -> new RuntimeException("Ingredient not found with id " + updatedStepIngredient.getIngredient().getId()));
        existingIngredient.setName(updatedStepIngredient.getIngredient().getName());
        Ingredient ingr = ingredientRepository.save(existingIngredient);
        existingStepIngredient.setIngredient(ingr);
        existingStepIngredient.setIngredient(updatedStepIngredient.getIngredient());
        existingStepIngredient.setUnit(updatedStepIngredient.getUnit());
        existingStepIngredient.setQuantity(updatedStepIngredient.getQuantity());

        return stepIngredientRepository.save(existingStepIngredient);
    }
}
