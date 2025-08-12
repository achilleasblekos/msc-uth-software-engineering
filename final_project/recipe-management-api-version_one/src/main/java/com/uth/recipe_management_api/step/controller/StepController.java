package com.uth.recipe_management_api.step.controller;


// import com.uth.recipe_management_api.recipe.entity.Recipe;
import com.uth.recipe_management_api.image.entity.Image;
import com.uth.recipe_management_api.step.entity.Step;
import com.uth.recipe_management_api.step.service.StepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/steps")
public class StepController {
    private final StepService stepService;

    @Autowired
    public StepController(StepService stepService) {
        this.stepService = stepService;
    }

    @PostMapping(value ="/{recipeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Step createStep(@RequestBody Step step, @PathVariable Long recipeId) {
        return stepService.createStep(step,recipeId);
    }

    @GetMapping("/all")
    public List<Step> getAllSteps() {
        return stepService.getAllStep();
    }
    @DeleteMapping("/{id}")
    public void deleteStep(@PathVariable Long id) {
        stepService.deleteStep(id);
    }

    @GetMapping("/{id}")
    public Step getStepById(@PathVariable Long id) {
        return stepService.getStepById(id);
    }

    @GetMapping("/recipe/{id}")
    public List<Step> getStepsByRecipeId(@PathVariable Long id) {
        return stepService.getStepsByRecipeId(id);
    }
    @PutMapping("/{id}")
    public Step updateStep(@PathVariable Long id, @RequestBody Step step) {
        return stepService.updateStep(id, step);
    }


    @PostMapping("/recipes/{recipeId}/steps/{stepId}/images")
    public ResponseEntity<Map<String, Object>> uploadImageToStep(
            @PathVariable Long recipeId,
            @PathVariable Long stepId,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        String filePath = stepService.addImageToStep(recipeId, stepId, file);

        Image savedImage = stepService.findImageByFilePath(filePath);
        Map<String, Object> response = Map.of(
                "id", savedImage.getId(),
                "filePath", savedImage.getFilePath()
        );

        return ResponseEntity.ok(response);
    }


    @DeleteMapping("/{recipeId}/{stepId}/images/{imageId}")
    public ResponseEntity<String> deleteImageFromStep(
            @PathVariable Long recipeId,
            @PathVariable Long stepId,
            @PathVariable Long imageId
    ) {
        // Ελέγχουμε ότι το step ανήκει στο recipe
        stepService.deleteImageFromStep(recipeId, stepId, imageId);
        return ResponseEntity.ok("Image deleted successfully");
    }

    @GetMapping("/recipes/{recipeId}/steps/{stepId}/images")
    public ResponseEntity<List<Map<String, Object>>> getImagesForStep(
            @PathVariable Long recipeId,
            @PathVariable Long stepId
    ) {
        // Ελέγχουμε ότι το step ανήκει στο recipe
        List<Map<String, Object>> images = stepService.getImagesForStep(recipeId, stepId);
        return ResponseEntity.ok(images);
    }
}
