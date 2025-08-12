import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ingredient } from 'src/app/recipe/recipe.model';
import { RecipeService } from 'src/app/recipe/recipe.service';

@Component({
  selector: 'app-add-step-ingredient',
  templateUrl: './add-step-ingredient.component.html',
  styleUrls: ['./add-step-ingredient.component.scss'],
})
export class AddStepIngredientComponent {
  stepIngredientsForm: FormGroup;
  ingredients: Ingredient[];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddStepIngredientComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { ingredients: any[]; step: any; selectedTabIndex:number },
    private recipeService: RecipeService,
    private snackBar: MatSnackBar
  ) {
    // Αρχικοποίηση της φόρμας
    this.stepIngredientsForm = this.fb.group({
      stepIngredients: this.fb.array([]), // Αρχικά δεν υπάρχουν υλικά
    });
  }

  // Getter για το FormArray
  get stepIngredients(): FormArray {
    return this.stepIngredientsForm.get('stepIngredients') as FormArray;
  }

  // Μέθοδος για προσθήκη νέου υλικού
  addStepIngredients(): void {
    const stepIngredientstGroup = this.fb.group({
      ingredientId: [''],
      quantity: [null, [Validators.required, Validators.min(0.1)]],
      unit: ['', Validators.required],
    });
    this.stepIngredients.push(stepIngredientstGroup);
  }

  // Μέθοδος για αφαίρεση υλικού
  removeStepIngredients(index: number): void {
    this.stepIngredients.removeAt(index);
  }

  // Μέθοδος για αποθήκευση
  save(): void {
    if (this.stepIngredientsForm.valid) {
      const payload = this.stepIngredientsForm.value.stepIngredients.map(
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
        .addStepIngredients(this.data.step.id, payload)
        .subscribe({
          next: () => {
            this.snackBar.open(`Τα υλικά προστέθηκαν επιτυχώς`, 'Κλείσιμο', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
            this.onClose();
          },
          error: (err) => {
            console.error('Error adding item:', err);
            this.snackBar.open(
              `Αποτυχία προσθήκης Υλικών. Προσπαθήστε ξανά.`,
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
    this.dialogRef.close(this.data.selectedTabIndex);
  }
}
