import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  Ingredient,
  Recipe,
  RecipeIngredient,
} from 'src/app/recipe/recipe.model';
import { RecipeService } from 'src/app/recipe/recipe.service';

@Component({
  selector: 'app-add-recipe-ingredient',
  templateUrl: './add-recipe-ingredient.component.html',
  styleUrls: ['./add-recipe-ingredient.component.scss'],
})
export class AddRecipeIngredientComponent {
  recipeIngredientsForm: FormGroup;
  ingredients: Ingredient[];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddRecipeIngredientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ingredients: any[]; recipe: any },
    private recipeService: RecipeService,
    private snackBar: MatSnackBar,
    private router:Router
  ) {
    // Αρχικοποίηση της φόρμας
    this.recipeIngredientsForm = this.fb.group({
      recipeIngredients: this.fb.array([]), // Αρχικά δεν υπάρχουν υλικά
    });
  }

  // Getter για το FormArray
  get recipeIngredients(): FormArray {
    return this.recipeIngredientsForm.get('recipeIngredients') as FormArray;
  }

  // Μέθοδος για προσθήκη νέου υλικού
  addRecipeIngredients(): void {
    const recipeIngredientstGroup = this.fb.group({
      ingredientId: [''],
      quantity: [null, [Validators.required, Validators.min(0.1)]],
      unit: ['', Validators.required],
    });
    this.recipeIngredients.push(recipeIngredientstGroup);
  }

  // Μέθοδος για αφαίρεση υλικού
  removeRecipeIngredients(index: number): void {
    this.recipeIngredients.removeAt(index);
  }

  // Μέθοδος για αποθήκευση
  save(): void {
    if (this.recipeIngredientsForm.valid) {
      const payload = this.recipeIngredientsForm.value.recipeIngredients.map(
        (ingredient: any) => ({
          ingredient: {
            id: '',
            name: ingredient.ingredientId,
          },
          quantity: ingredient.quantity,
          unit: ingredient.unit,
        })
      );
      // Call the service to add the ingredients
      this.recipeService
        .addRecipeIngredients(this.data.recipe.id, payload)
        .subscribe({
          next: () => {
            this.snackBar.open(
              `Τα υλικά προστέθηκαν επιτυχώς.`,
              'Κλείσιμο',
              {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
              }
            );
            this.onClose();
          },
          error: (err) => {
            console.error('Error adding item:', err);
            this.snackBar.open(
              `Αποτυχία προσθήκης υλικών. Προσπαθήστε ξανά.`,
              'Κλείσιμο',
              {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
              }
            );
          },
        });
    }
  }

  // Μέθοδος για ακύρωση
  onClose(): void {
    this.dialogRef.close();
  }
}
