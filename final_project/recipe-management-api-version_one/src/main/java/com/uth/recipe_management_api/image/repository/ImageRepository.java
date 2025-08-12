package com.uth.recipe_management_api.image.repository;

import com.uth.recipe_management_api.image.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {
    Optional<Image> findByFilePath(String filePath);
}
