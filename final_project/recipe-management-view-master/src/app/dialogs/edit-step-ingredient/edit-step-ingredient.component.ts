import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ingredient, StepIngredient } from 'src/app/recipe/recipe.model';
import { RecipeService } from 'src/app/recipe/recipe.service';

@Component({
  selector: 'app-edit-step-ingredient',
  templateUrl: './edit-step-ingredient.component.html',
  styleUrls: ['./edit-step-ingredient.component.scss'],
})
export class EditStepIngredientComponent {
  stepIngredientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private recipeService: RecipeService,
    public dialogRef: MatDialogRef<EditStepIngredientComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      stepIngredient: StepIngredient;
      ingredients: Ingredient[];
    }
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    console.log(this.data.stepIngredient);

    this.stepIngredientForm = this.fb.group({
      id: [this.data.stepIngredient.id],
      ingredient: [
        this.data.stepIngredient.ingredient?.id,
        Validators.required,
      ],
      quantity: [
        this.data.stepIngredient.quantity,
        [Validators.required, Validators.min(1)],
      ],
      unit: [this.data.stepIngredient.unit, Validators.required],
    });
  }

  save() {
    if (this.stepIngredientForm.valid) {
      const stepIngredientData: any = this.stepIngredientForm.value;
      const payload: StepIngredient = {
        id: stepIngredientData.id,
        ingredient: {
          id: stepIngredientData.ingredient,
          name:
            this.data.ingredients.find(
              (ingredient) => ingredient.id === stepIngredientData.ingredient
            )?.name || '',
        },
        quantity: stepIngredientData.quantity,
        unit: stepIngredientData.unit,
      };
      this.recipeService
        .updateStepIngredient(this.data.stepIngredient.id, payload)
        .subscribe({
          next: (data) => {
            this.snackBar.open(
              `Το υλικό του βήματος ενημερώθηκε επιτυχώς!`,
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
              `Αποτυχία ενημέρωσης υλικού Βήματος. Προσπαθήστε ξανά`,
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
