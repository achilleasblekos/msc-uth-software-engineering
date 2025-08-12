package com.uth.recipe_management_api.step.service;

import com.uth.recipe_management_api.image.entity.Image;
import com.uth.recipe_management_api.image.repository.ImageRepository;
import com.uth.recipe_management_api.recipe.entity.Recipe;
import com.uth.recipe_management_api.recipe.repository.RecipeRepository;
import com.uth.recipe_management_api.step.entity.Step;
import com.uth.recipe_management_api.step.repository.StepRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
public class StepService {

    private final StepRepository stepRepository;
    private final ImageRepository imageRepository;
    private final RecipeRepository recipeRepository;

    public StepService(StepRepository stepRepository,ImageRepository imageRepository,RecipeRepository recipeRepository) {
        this.stepRepository = stepRepository;
        this.imageRepository = imageRepository;
        this.recipeRepository = recipeRepository;
    }

    public Step createStep(Step step,Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found with id: " + recipeId));

        step.setRecipe(recipe);
        return stepRepository.save(step);
    }

    public List<Step> getAllStep() {
        return stepRepository.findAll();
    }

    public Step getStepById(Long id) {
        return stepRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Step not found"));
    }
    public List<Step> getStepsByRecipeId(Long id) {
        return stepRepository.findByRecipeId(id);
        }
    public void deleteStep(Long id) {

        Step existingStep = stepRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Step not found with id " + id));

        stepRepository.delete(existingStep);
    }

    public Step updateStep(Long id, Step updatedStep) {

        Step existingStep = stepRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Step not found with id " + id));
        existingStep.setTitle(updatedStep.getTitle());
        existingStep.setDescription(updatedStep.getDescription());
        existingStep.setDurationHours(updatedStep.getDurationHours());
        existingStep.setDurationMinutes(updatedStep.getDurationMinutes());
        existingStep.setStepOrder(updatedStep.getStepOrder());

        return stepRepository.save(existingStep);
    }

    public String addImageToStep(Long recipeId, Long stepId, MultipartFile file) throws IOException {
        Step step = stepRepository.findById(stepId)
                .orElseThrow(() -> new RuntimeException("Step not found with id: " + stepId));

        // Δημιουργία διαδρομής φακέλου
        String fileName = file.getOriginalFilename();
        String folderPath = "images/recipes/" + recipeId + "/steps/" + stepId;
        Path directoryPath = Paths.get(folderPath);
        Files.createDirectories(directoryPath); // Δημιουργία φακέλου αν δεν υπάρχει

        // Ορισμός διαδρομής αρχείου
        String filePath = folderPath + "/" + fileName;
        Path path = Paths.get(filePath);
        Files.write(path, file.getBytes()); // Αποθήκευση αρχείου

        // Αποθήκευση εγγραφής στη βάση δεδομένων
        Image image = new Image();
        image.setFileName(fileName);
        image.setFilePath(filePath);
        image.setStep(step);

        imageRepository.save(image);
        return filePath;
    }


    public void deleteImageFromStep(Long recipeId, Long stepId, Long imageId) {
        Step step = stepRepository.findById(stepId)
                .orElseThrow(() -> new RuntimeException("Step not found with id: " + stepId));

        // Ελέγχουμε ότι το step ανήκει στο recipe
        if (!step.getRecipe().getId().equals(recipeId)) {
            throw new RuntimeException("Step does not belong to the specified recipe");
        }

        Image image = imageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Image not found"));

        if (!step.getImages().contains(image)) {
            throw new RuntimeException("Image does not belong to the specified step");
        }

        Path filePath = Paths.get(image.getFilePath());
        try {
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete file: " + image.getFilePath(), e);
        }

        step.getImages().remove(image);
        stepRepository.save(step);
        imageRepository.delete(image);
    }

    public List<Map<String, Object>> getImagesForStep(Long recipeId, Long stepId) {
        Step step = stepRepository.findById(stepId)
                .orElseThrow(() -> new RuntimeException("Step not found with id: " + stepId));

        // Ελέγχουμε ότι το step ανήκει στο recipe
        if (!step.getRecipe().getId().equals(recipeId)) {
            throw new RuntimeException("Step does not belong to the specified recipe");
        }

        return step.getImages().stream()
                .map(image -> {
                    Map<String, Object> imageMap = new HashMap<>();
                    imageMap.put("id", image.getId());
                    imageMap.put("path", "images/recipes/" + recipeId + "/steps/" + stepId + "/" + image.getFileName());
                    return imageMap;
                })
                .collect(Collectors.toList());
    }


    public Image findImageByFilePath(String filePath) {
        return imageRepository.findByFilePath(filePath)
                .orElseThrow(() -> new RuntimeException("Image not found with path: " + filePath));
    }
}

