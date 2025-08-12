import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import {
  Ingredient,
  Recipe,
  RecipeCategory,
  RecipeDifficulty,
  RecipeIngredient,
} from '../recipe.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddRecipeIngredientComponent } from 'src/app/dialogs/add-recipe-ingredient/add-recipe-ingredient.component';
import { EditRecipeIngredientComponent } from 'src/app/dialogs/edit-recipe-ingredient/edit-recipe-ingredient.component';


@Component({
  selector: 'app-recipe-create',
  templateUrl: './create.component.html',
})
export class RecipeCreateComponent implements OnInit, AfterViewInit {
  recipeForm!: FormGroup;
  stepForm!: FormGroup;
  isEditMode = false;
  recipeId: string = '';
  displayedColumns: string[] = ['name', 'quantity', 'unit', 'actions'];
  recipeIngredientArray: RecipeIngredient[] = [];
  recipe: Recipe;
  ingredients: Ingredient[];
  recipeDifficulty: RecipeDifficulty;
  recipeCategory = RecipeCategory;
  isCreated: boolean = false;
  // Options array, where each option will have a value from RecipeCategory/RecipeDifficulty
  Catoptions = Object.values(RecipeCategory);
  Difoptions = Object.values(RecipeDifficulty);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedTabIndex: number;
  dataSource = new MatTableDataSource<RecipeIngredient>(
    this.recipeIngredientArray
  );
  flag: string ='isRecipe';
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeComponent();
  }


  initializeComponent(): void {
    this.recipeService
      .getIngredients()
      .subscribe((data) => (this.ingredients = data));

    this.recipeForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      category: ['', Validators.required],
      difficulty: ['', Validators.required],
      totalTime: [null, [Validators.required, Validators.min(1)]],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      // const tabIndex = params.get('selectedTabIndex');
      // console.log(tabIndex);
      // if (tabIndex !== undefined) {
      //   this.selectedTabIndex = +tabIndex; // Convert to a number
      // }
      if (id) {
        this.isEditMode = true;
        this.recipeId = id;
        this.loadRecipeForEdit(this.recipeId);
      }
    });

    this.route.queryParams.subscribe((params)=>{
      this.selectedTabIndex = +params['selectedTabIndex'];
      console.log(this.selectedTabIndex);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  forceInit() {
    this.initializeComponent();
  }

  loadRecipeForEdit(id: string): void {
    this.recipeService.getRecipeById(id).subscribe({
      next: (recipe: Recipe) => {
        this.recipe = recipe;
        this.recipeForm.patchValue({
          id: recipe.id,
          name: recipe.name,
          category: recipe.category,
          difficulty: recipe.difficulty,
          totalTime: recipe.totalTime,
        });
        this.recipeIngredientArray = this.recipe.recipeIngredient;

        // Force change detection
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }

  addIngredient(): void {
    const dialogRef = this.dialog.open(AddRecipeIngredientComponent, {
      data: {
        ingredients: this.ingredients,
        recipe: this.recipe,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      if (this.isEditMode) {
        this.forceInit();
      } else {
        this.router.navigate(['/recipe/home']);
      }
    });
  }

  editIngredient(recipeIngredient: RecipeIngredient): void {
    const dialogRef = this.dialog.open(EditRecipeIngredientComponent, {
      data: {
        recipeIngredient,
        ingredients: this.ingredients,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.forceInit();
    });
  }

  deleteIngredient(id: number) {
    //string
    const idStr = id.toString();
    this.recipeService.deleteRecipeIngredient(idStr).subscribe({
      next: () => {
        this.snackBar.open(
          `Το υλικό της συνταγής διαγράφηκε επιτυχώς!`,
          'Κλείσιμο',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          }
        );
        this.forceInit();
      },
      error: (err) => {
        console.error('Error deleting item:', err);
        this.snackBar.open(
          `Αποτυχία διαγραφής του υλικού. Προσπαθήστε ξανά.`,
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

  onSubmit(): void {
    if (this.recipeForm.valid) {
      const recipeData: Recipe = this.recipeForm.value;
      if (this.isEditMode) {
        this.recipeService.updateRecipe(this.recipeId, recipeData).subscribe({
          next: () => {
            this.snackBar.open(`Η συνταγή ενημερώθηκε επιτυχώς!`, 'Κλείσιμο', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          },
          error: (err) => {
            console.error('Error updating item:', err);
            this.snackBar.open(
              `Αποτυχία ενημέρωσης συνταγής. Προσπαθήστε ξανά`,
              'Κλείσιμο',
              {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
              }
            );
          },
        });
      } else {
        console.log(recipeData)
        this.recipeService.addRecipe(recipeData).subscribe({
          next: (data) => {
            this.isCreated = true;
            this.recipe = data;
            this.recipeId = data.id.toString();
            this.snackBar.open(`Η συνταγή δημιουργήθηκε επιτυχώς!`, 'Κλείσιμο', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          },
          error: (err) => {
            console.error('Error adding item:', err);
            this.snackBar.open(
              `Αποτυχία δημιουργίας συνταγής. Προσπαθήστε ξανά.`,
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
    } else {
      console.error('Form is invalid!');
    }
  }
}


