package com.uth.recipe_management_api.recipe.entity;


public class ProgressDto {
    private double progress;
    private int currentStepIndex;

    public ProgressDto(double progress, int currentStepIndex) {
        this.progress = progress;
        this.currentStepIndex = currentStepIndex;
    }

    public double getProgress() {
        return progress;
    }

    public void setProgress(double progress) {
        this.progress = progress;
    }

    public int getCurrentStepIndex() {
        return currentStepIndex;
    }

    public void setCurrentStepIndex(int currentStepIndex) {
        this.currentStepIndex = currentStepIndex;
    }
}
