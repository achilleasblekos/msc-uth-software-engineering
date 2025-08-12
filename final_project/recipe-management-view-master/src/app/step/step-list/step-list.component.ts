import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Recipe, Step } from 'src/app/recipe/recipe.model';
import { RecipeService } from 'src/app/recipe/recipe.service';

@Component({
  selector: 'app-step-list',
  templateUrl: './step-list.component.html',
  styleUrls: ['./step-list.component.scss'],
})
export class StepListComponent implements OnInit {
  @Input() recipeId: string;
  @Input() selectedTabIndex: number;

  cols = 3;
  steps: Step[] = [];
  displayedColumns: string[] = ['name', 'category', 'actions'];

  constructor(
    private recipeService: RecipeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getStepListByRecipeId(this.recipeId);
  }

  editRecipe(id: string) {
    // Redirect to edit page
  }

  getStepListByRecipeId(id: string) {
    this.recipeService
      .getStepsByRecipeId(id)
      .subscribe((data) => ((this.steps = data), console.log(data)));
  }

  deleteStep(id: number) {
    //string
    const idStr = id.toString();
    this.recipeService.deleteStep(idStr).subscribe({
      next: () => {
        this.snackBar.open(`Το βήμα διαγράφηκε επιτυχώς!`, 'Κλείσιμο', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.getStepListByRecipeId(this.recipeId);
      },
      error: (err) => {
        console.error('Error deleting item:', err);
        this.snackBar.open(
          `Αποτυχία διαγραφής του βήματος. Προσπαθήστε ξανά.`,
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
