package com.uth.recipe_management_api.recipe.controller;

import com.uth.recipe_management_api.image.entity.Image;
import com.uth.recipe_management_api.image.repository.ImageRepository;
import com.uth.recipe_management_api.recipe.entity.ProgressDto;
import com.uth.recipe_management_api.recipe.entity.Recipe;
import com.uth.recipe_management_api.recipe.service.RecipeService;
import com.uth.recipe_management_api.step.entity.Step;
import com.uth.recipe_management_api.step.service.StepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/recipes")
public class RecipeController {
    private final RecipeService recipeService;
    private final StepService stepService;
    private final ImageRepository imageRepository;
    @Autowired
    public RecipeController(RecipeService recipeService, StepService stepService, ImageRepository imageRepository) {
        this.recipeService = recipeService;
        this.stepService = stepService;
        this.imageRepository = imageRepository;
    }

    @PostMapping
    public Recipe createRecipe(@RequestBody Recipe recipe) {
        return recipeService.createRecipe(recipe);
    }

    @GetMapping("/all")
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @GetMapping("/{id}")
    public Recipe getRecipeById(@PathVariable Long id) {
        return recipeService.getRecipeById(id);
    }


    @PutMapping("/{id}")
    public Recipe updateRecipe(@PathVariable Long id, @RequestBody Recipe recipe) {
        return recipeService.updateRecipe(id, recipe);
    }
    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable Long id) {
        recipeService.deleteRecipe(id);
    }


    @GetMapping("/progress/{recipeId}/{currentStepIndex}")
    public ProgressDto getProgress(@PathVariable Long recipeId, @PathVariable int currentStepIndex) {

        Recipe recipe = recipeService.getRecipeById(recipeId);
        int totalDuration = recipe.getTotalTime();

        List<Step> recipeSteps = stepService.getStepsByRecipeId(recipeId);

        int timeSpent = 0;
        for (int i = 0; i <= currentStepIndex; i++) {
            timeSpent += (recipeSteps.get(i).getDurationHours() * 60 + recipeSteps.get(i).getDurationMinutes());
        }

        double progress = (double) timeSpent / totalDuration * 100;

        ProgressDto progressDto = new ProgressDto(progress, currentStepIndex);//Προόδος και τρέχων βήμα
        return progressDto;
    }

    @PostMapping("/{id}/images")
    public ResponseEntity<Map<String, Object>> uploadImageToRecipe(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        String filePath = recipeService.addImageToRecipe(id, file);

        Image savedImage = imageRepository.findByFilePath(filePath)
                .orElseThrow(() -> new RuntimeException("Image not found after saving"));

        Map<String, Object> response = Map.of(
                "id", savedImage.getId(),
                "filePath", savedImage.getFilePath()
        );

        return ResponseEntity.ok(response);
    }



    @DeleteMapping("/{id}/image/{imageId}")
    public ResponseEntity<String> deleteImageFromRecipe(
            @PathVariable Long id,
            @PathVariable Long imageId
    ) {
        recipeService.deleteImageFromRecipe(id, imageId);
        return ResponseEntity.ok("Image deleted successfully");
    }

    @GetMapping("/{id}/images")
    public ResponseEntity<List<Map<String, Object>>> getImagesForRecipe(@PathVariable Long id) {
        List<Map<String, Object>> imagePaths = recipeService.getImagesForRecipe(id);
        return ResponseEntity.ok(imagePaths);
    }

}
