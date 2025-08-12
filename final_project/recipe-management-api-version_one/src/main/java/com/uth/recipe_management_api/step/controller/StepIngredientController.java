package com.uth.recipe_management_api.step.controller;

// import com.uth.recipe_management_api.recipe.entity.RecipeIngredient;
import com.uth.recipe_management_api.step.entity.StepIngredient;
import com.uth.recipe_management_api.step.service.StepIngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stepingredients")
public class StepIngredientController {
    private final StepIngredientService stepIngredientService;

    @Autowired
    public StepIngredientController(StepIngredientService stepIngredientService) {
        this.stepIngredientService = stepIngredientService;
    }

    @PostMapping
    public StepIngredient createStepIngredient(@RequestBody StepIngredient stepIngredient) {
        return stepIngredientService.createStep(stepIngredient);
    }

    @GetMapping("/all")
    public List<StepIngredient> getAllStepIngredients() {
        List<StepIngredient> redf = stepIngredientService.getAllStepIngredient();
        return redf;
    }

    @GetMapping("/{id}")
    public StepIngredient getStepIngredientById(@PathVariable Long id) {
        return stepIngredientService.getStepIngredientById(id);
    }

    @PostMapping("/ingredients/{stepId}")
    public List<StepIngredient> addStepIngredients(
            @PathVariable Long stepId,
            @RequestBody List<StepIngredient> stepIngredients) {
        return stepIngredientService.addStepIngredients(stepId, stepIngredients);
    }

    @DeleteMapping("/{id}")
    public void deleteStepIngredient(@PathVariable Long id) {
        stepIngredientService.deleteStepIngredient(id);
    }

    @PutMapping("/{id}")
    public StepIngredient updateStepIngredient(@PathVariable Long id, @RequestBody StepIngredient stepIngredient) {
        return stepIngredientService.updateStepIngredient(id, stepIngredient);
    }
}
