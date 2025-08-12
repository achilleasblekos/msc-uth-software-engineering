import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Ingredient,
  Progress,
  Recipe,
  RecipeIngredient,
  Step,
  StepIngredient,
} from './recipe.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {

  private apiUrlBase = environment.apiUrl;
  
  private apiUrl = this.apiUrlBase +'/recipes';
  private apiUrl2 =this.apiUrlBase + '/ingredients';
  private apiUrl3 =this.apiUrlBase + '/recipeingredients';
  private apiUrl4 =this.apiUrlBase + '/steps';
  private apiUrl5 =this.apiUrlBase + '/stepingredients';

  constructor(private http: HttpClient) {}

  // Ανάκτηση όλων των συνταγών
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/all`);
  }

  // Προσθήκη νέας συνταγής
  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrl, recipe);
  }

  // Ενημέρωση συνταγής
  updateRecipe(id: string, recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.apiUrl}/${id}`, recipe);
  }

  // Διαγραφή συνταγής
  deleteRecipe(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  //
  // Ανάκτηση όλων των υλικών
  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.apiUrl2}/all`);
  }
  //Προσθήκη Υλικών
  addRecipeIngredients(
    recipeId: string,
    recipeIngredient: RecipeIngredient[]
  ): Observable<RecipeIngredient[]> {
    return this.http.post<RecipeIngredient[]>(
      `${this.apiUrl3}/ingredients/${recipeId}`,
      recipeIngredient
    );
  }

  // Διαγραφή υλικού συνταγής
  deleteRecipeIngredient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl3}/${id}`);
  }
  // Ενημέρ υλικού συνταγής
  updateRecipeIngredient(
    id: string,
    recipeIngredient: RecipeIngredient
  ): Observable<RecipeIngredient> {
    return this.http.put<RecipeIngredient>(
      `${this.apiUrl3}/${id}`,
      recipeIngredient
    );
  }

  // Βήματα βασει recipe id
  // Ανάκτηση όλων των βημάτων
  getStepsByRecipeId(id: string): Observable<Step[]> {
    return this.http.get<Step[]>(`${this.apiUrl4}/recipe/${id}`);
  }

  // Διαγραφή βήματος
  deleteStep(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl4}/${id}`);
  }

  getStepById(id: string): Observable<Step> {
    return this.http.get<Step>(`${this.apiUrl4}/${id}`);
  }

  // Προσθήκη νέου βήματος
  addStep(step: Step, id: string): Observable<Step> {
    return this.http.post<Step>(`${this.apiUrl4}/${id}`, step);
  }

  // Ενημέρωση συνταγής
  updateStep(id: string, step: Step): Observable<Step> {
    return this.http.put<Step>(`${this.apiUrl4}/${id}`, step);
  }

  // Διαγραφή υλικού Βήματος
  deleteStepIngredient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl5}/${id}`);
  }

  //Προσθήκη Υλικών Βήματος
  addStepIngredients(
    stepId: string,
    stepIngredient: StepIngredient[]
  ): Observable<StepIngredient[]> {
    return this.http.post<StepIngredient[]>(
      `${this.apiUrl5}/ingredients/${stepId}`,
      stepIngredient
    );
  }

  // Ενημέρωση υλικού συνταγής
  updateStepIngredient(
    id: string,
    stepIngredient: StepIngredient
  ): Observable<StepIngredient> {
    return this.http.put<StepIngredient>(
      `${this.apiUrl5}/${id}`,
      stepIngredient
    );
  }

  // Ενημέρωση υλικού συνταγής
  updateProgress(id: string, index: number): Observable<Progress> {
    return this.http.get<Progress>(`${this.apiUrl}/progress/${id}/` + index);
  }
}
