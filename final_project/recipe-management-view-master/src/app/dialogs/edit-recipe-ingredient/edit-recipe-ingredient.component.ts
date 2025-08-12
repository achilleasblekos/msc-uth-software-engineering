import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Ingredient,
  Recipe,
  RecipeIngredient,
} from 'src/app/recipe/recipe.model';
import { RecipeService } from 'src/app/recipe/recipe.service';

@Component({
  selector: 'app-edit-recipe-ingredient',
  templateUrl: './edit-recipe-ingredient.component.html',
  styleUrls: ['./edit-recipe-ingredient.component.scss'],
})
export class EditRecipeIngredientComponent {
  recipeIngredientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private recipeService: RecipeService,
    public dialogRef: MatDialogRef<EditRecipeIngredientComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      recipeIngredient: RecipeIngredient;
      ingredients: Ingredient[];
    }
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    console.log(this.data.recipeIngredient);

    this.recipeIngredientForm = this.fb.group({
      id: [this.data.recipeIngredient.id],
      ingredient: [
        this.data.recipeIngredient.ingredient.name,
        Validators.required,
      ],
      quantity: [
        this.data.recipeIngredient.quantity,
        [Validators.required, Validators.min(1)],
      ],
      unit: [this.data.recipeIngredient.unit, Validators.required],
    });
  }

  save() {
    if (this.recipeIngredientForm.valid) {
      const recipeIngredientData: any = this.recipeIngredientForm.value;
      const payload: RecipeIngredient = {
        id: recipeIngredientData.id,
        ingredient: {
          id: this.data.recipeIngredient.ingredient.id,
          name:
            recipeIngredientData.ingredient,
        },
        quantity: recipeIngredientData.quantity,
        unit: recipeIngredientData.unit,
      };
      console.log(recipeIngredientData);
      this.recipeService
        .updateRecipeIngredient(this.data.recipeIngredient.id, payload)
        .subscribe({
          next: (data) => {
            this.snackBar.open(
              `Το υλικό της συνταγής ενημερώθηκε επιτυχώς!`,
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
            console.error('Error updating item:', err);
            this.snackBar.open(
              `Αποτυχία ενημέρωσης υλικού συνταγής. Προσπαθήστε ξανά`,
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
