export interface Ingredient {
  id?: string;
  name: string;
}

export interface RecipeIngredient {
  id?: string;
  ingredient: Ingredient;
  quantity: number;
  unit: string | null;
}

export interface Step {
  id?: number;
  title: string;
  description: string;
  durationHours: number; // in hours
  durationMinutes: number; // in minutes
  stepOrder: number;
  ingredients: StepIngredient[];
}

export interface StepIngredient {
  id?: string;
  ingredient: Ingredient;
  quantity: number;
  unit: string | null;
}
export interface Progress {
  progress: number;
  currentStepIndex: number;
}

export interface Recipe {
  category: RecipeCategory;
  difficulty: RecipeDifficulty;
  id?: number;
  name: string;
  recipeIngredient: RecipeIngredient[];
  totalTime: number; // in minutes
  // steps: Step[];
  // images?: string[]; // Optional image URLs
}
export enum RecipeCategory {
  PASTA = 'PASTA',
  MEAT = 'MEAT',
  FISH = 'FISH',
  VEGETARIAN = 'VEGETARIAN',
  DESSERT = 'DESSERT',
}
export enum RecipeDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}
