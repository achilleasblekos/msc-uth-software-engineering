import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './list.component.html',
})
export class RecipeListComponent implements OnInit {
  cols = 3;
  recipes: Recipe[] = [];
  displayedColumns: string[] = ['name', 'category', 'actions'];

  constructor(
    private recipeService: RecipeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((data) => (this.recipes = data));
  }

  editRecipe(id: string) {
    // Redirect to edit page
  }

  getRecipeList() {
    this.recipeService.getRecipes().subscribe((data) => (this.recipes = data));
  }

  deleteRecipe(id: number) {
    //string
    const idStr = id.toString();
    this.recipeService.deleteRecipe(idStr).subscribe({
      next: () => {
        this.snackBar.open(`Η συνταγή διαγράφηκε επιτυχώς!`, 'Κλείσιμο', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.getRecipeList();
      },
      error: (err) => {
        console.error('Error deleting item:', err);
        this.snackBar.open(
          `Αποτυχία διαγραφής της συνταγής. Προσπαθήστε ξανά.`,
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

  executeRecipe(id: string) {
    // Redirect to execute page
  }
}
