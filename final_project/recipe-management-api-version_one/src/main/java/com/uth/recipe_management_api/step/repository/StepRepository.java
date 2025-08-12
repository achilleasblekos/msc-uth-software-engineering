package com.uth.recipe_management_api.step.repository;

import com.uth.recipe_management_api.step.entity.Step;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StepRepository extends JpaRepository<Step, Long> {
    List<Step> findByRecipeId(Long id);
}
