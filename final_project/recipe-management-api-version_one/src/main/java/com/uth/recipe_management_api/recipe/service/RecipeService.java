package com.uth.recipe_management_api.recipe.service;

import com.uth.recipe_management_api.image.entity.Image;
import com.uth.recipe_management_api.image.repository.ImageRepository;
import com.uth.recipe_management_api.recipe.entity.Recipe;
import com.uth.recipe_management_api.recipe.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
public class RecipeService{

    private final RecipeRepository recipeRepository;
    private final ImageRepository imageRepository;
    @Autowired
    public RecipeService(RecipeRepository recipeRepository,ImageRepository imageRepository) {
        this.recipeRepository = recipeRepository;
        this.imageRepository = imageRepository;
    }


    public Recipe createRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Recipe getRecipeById(Long id) {
        return recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));
    }
    public Recipe updateRecipe(Long id, Recipe updatedRecipe) {

        Recipe existingRecipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found with id " + id));
        existingRecipe.setName(updatedRecipe.getName());
        existingRecipe.setCategory(updatedRecipe.getCategory());
        existingRecipe.setDifficulty(updatedRecipe.getDifficulty());
        existingRecipe.setTotalTime(updatedRecipe.getTotalTime());

        return recipeRepository.save(existingRecipe);
    }


    public void deleteRecipe(Long id) {
        Recipe existingRecipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found with id " + id));

        // Διαγραφή φακέλου συνταγής και όλων των εικόνων
        Path recipeFolderPath = Paths.get("images/recipes/" + id);
        if (Files.exists(recipeFolderPath)) {
            try {
                Files.walk(recipeFolderPath)
                        .sorted((a, b) -> b.compareTo(a)) // Διαγράφει πρώτα τα περιεχόμενα
                        .forEach(path -> {
                            try {
                                Files.deleteIfExists(path);
                            } catch (IOException e) {
                                throw new RuntimeException("Failed to delete file: " + path, e);
                            }
                        });
            } catch (IOException e) {
                throw new RuntimeException("Failed to delete recipe folder", e);
            }
        } else {
            System.out.println("Folder does not exist: " + recipeFolderPath.toString());
        }

        recipeRepository.delete(existingRecipe);
    }


    public String addImageToRecipe(Long recipeId, MultipartFile file) throws IOException {
        Recipe recipe = getRecipeById(recipeId);

        String fileName = file.getOriginalFilename();
        String folderPath = "images/recipes/" + recipeId;
        Path directoryPath = Paths.get(folderPath);
        Files.createDirectories(directoryPath);

        String filePath = folderPath + "/" + fileName;
        Path path = Paths.get(filePath);
        Files.write(path, file.getBytes());

        Image image = new Image();
        image.setFileName(fileName);
        image.setFilePath(filePath);
        image.setData(file.getBytes());
        image.setRecipe(recipe);

        imageRepository.save(image);
        return filePath;
    }


    public void deleteImageFromRecipe(Long recipeId, Long imageId) {
        Recipe recipe = getRecipeById(recipeId);

        // Βρίσκουμε την εικόνα στη βάση
        Image image = imageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Image not found with ID: " + imageId));

        // Ελέγχουμε ότι η εικόνα ανήκει στη συνταγή
        if (!recipe.getImages().contains(image)) {
            throw new RuntimeException("Image does not belong to the recipe");
        }

        // Διαγραφή του αρχείου από το σύστημα
        Path filePath = Paths.get(image.getFilePath());
        try {
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete file from storage: " + image.getFilePath(), e);
        }

        // Διαγραφή της εικόνας από τη βάση δεδομένων
        recipe.getImages().remove(image);
        recipeRepository.save(recipe); // Ενημερώνουμε τη συνταγή
        imageRepository.delete(image); // Διαγράφουμε την εικόνα
    }



    public List<Map<String, Object>> getImagesForRecipe(Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        return recipe.getImages().stream()
                .filter(image -> image.getStep() == null) // Επιστρέφουμε μόνο εικόνες που δεν ανήκουν σε steps
                .map(image -> {
                    Map<String, Object> imageMap = new HashMap<>();
                    imageMap.put("id", image.getId());
                    imageMap.put("path", image.getFilePath());
                    return imageMap;
                })
                .collect(Collectors.toList());
    }
}
