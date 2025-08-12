import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Progress, Recipe, Step } from '../recipe.model';

@Component({
  selector: 'app-recipe-execute',
  templateUrl: './execute.component.html',
})
export class RecipeExecuteComponent implements OnInit {
  recipe: Recipe | undefined;
  steps: Step[];
  currentStepIndex = 0;
  progress = 0;
  recipeId: string;
  hasNoSteps = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id');
    this.recipeService.getRecipeById(this.recipeId).subscribe({
      next: (recipe: Recipe) => {
        console.log(recipe);
        this.recipe = recipe;
      },
      error: (err) => console.error(err),
    });

    this.getStepsOfRecipe(this.recipeId);
    this.updateProgress(this.recipeId, this.currentStepIndex);
  }

  getStepsOfRecipe(id: string) {
    this.recipeService.getStepsByRecipeId(id).subscribe((data) => {
      this.steps = data;
      if (this.steps.length == 0) {
        this.hasNoSteps = true;
      }
    });
  }
  updateProgress(id: string, index: number) {
    this.recipeService.updateProgress(id, index).subscribe({
      next: (progress: Progress) => {
        this.progress = progress.progress;
        this.currentStepIndex = progress.currentStepIndex;
      },
      error: (err) => console.error(err),
    });
  }

  get currentStep(): Step | undefined {
    return this.steps[this.currentStepIndex];
  }

  goToNextStep(): void {
    if (this.recipe && this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
      this.updateProgress(this.recipeId, this.currentStepIndex);
    }
  }

  get isRecipeCompleted(): boolean {
    return this.recipe ? this.currentStepIndex >= this.steps.length - 1 : false;
  }
}
