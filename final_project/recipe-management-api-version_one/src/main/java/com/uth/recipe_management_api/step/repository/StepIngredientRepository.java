package com.uth.recipe_management_api.step.repository;

import com.uth.recipe_management_api.step.entity.StepIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StepIngredientRepository extends JpaRepository<StepIngredient, Long>{}
