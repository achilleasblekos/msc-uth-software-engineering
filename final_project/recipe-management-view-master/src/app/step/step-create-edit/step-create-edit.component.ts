import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AddStepIngredientComponent } from 'src/app/dialogs/add-step-ingredient/add-step-ingredient.component';
import { EditStepIngredientComponent } from 'src/app/dialogs/edit-step-ingredient/edit-step-ingredient.component';
import { Ingredient, Step, StepIngredient } from 'src/app/recipe/recipe.model';
import { RecipeService } from 'src/app/recipe/recipe.service';

@Component({
  selector: 'app-step-create-edit',
  templateUrl: './step-create-edit.component.html',
  styleUrls: ['./step-create-edit.component.scss'],
})
export class StepCreateEditComponent implements OnInit {
  stepForm!: FormGroup;
  isEditMode = false;
  stepId!: string;
  displayedColumns: string[] = ['name', 'quantity', 'unit', 'actions'];
  stepIngredientArray: StepIngredient[] = [];
  step: Step;
  ingredients: Ingredient[];
  isCreated: boolean = false;
  recipeId: string;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dataSource = new MatTableDataSource<StepIngredient>(this.stepIngredientArray);
  selectedTabIndex: number;
  flag: string = "isStep";
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator!;
    this.initializeComponent();
  }

  initializeComponent(): void {
    this.recipeService
      .getIngredients()
      .subscribe((data) => (this.ingredients = data));

    this.stepForm = this.fb.group({
      // id: [null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      durationHours: [null],
      durationMinutes: [null],
      stepOrder: [null, [Validators.required, Validators.min(1)]],
    });

    this.route.paramMap.subscribe((params) => {
      console.log(params);
      const id = params.get('id');
      const idRec = params.get('recipeId');
      const selectedTabIndex = +params.get('selectedTabIndex');
      this.selectedTabIndex = selectedTabIndex;

      this.recipeId = idRec;
      if (id) {
        this.isEditMode = true;
        this.stepId = id;
        this.loadStepForEdit(this.stepId);
      }
    });
    console.log(this.selectedTabIndex);
    console.log(this.stepId);
    console.log(this.recipeId);
  }

  forceInit() {
    this.initializeComponent();
  }

  loadStepForEdit(id: string): void {
    this.recipeService.getStepById(id).subscribe({
      next: (step: Step) => {
        this.step = step;
        this.stepForm.patchValue({
          title: step.title,
          description: step.description,
          durationHours: step.durationHours,
          durationMinutes: step.durationMinutes,
          stepOrder: step.stepOrder,
        });
        this.stepIngredientArray = this.step.ingredients;
        // Force change detection
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }

  addIngredient(): void {
    const dialogRef = this.dialog.open(AddStepIngredientComponent, {
      data: {
        ingredients: this.ingredients,
        step: this.step,
        selectedTabIndex: this.selectedTabIndex,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (this.isEditMode) {
        this.forceInit();
      } else {
        this.goBackToList(result);
      }
    });
  }

  editIngredient(stepIngredient: StepIngredient): void {
    const dialogRef = this.dialog.open(EditStepIngredientComponent, {
      data: {
        stepIngredient,
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
    this.recipeService.deleteStepIngredient(idStr).subscribe({
      next: () => {
        this.snackBar.open(
          `Το υλικό του βήματος διαγράφηκε επιτυχώς!`,
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
          `Αποτυχία διαγραφής του υλικού του βήματος. Προσπαθήστε ξανά.`,
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
    if (this.stepForm.valid) {
      const stepData: Step = this.stepForm.value;

      if (this.isEditMode) {
        this.recipeService.updateStep(this.stepId, stepData).subscribe({
          next: () => {
            this.snackBar.open(`To βήμα ενημερώθηκε επιτυχώς!`, 'Κλείσιμο', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          },
          error: (err) => {
            this.snackBar.open(
              `Αποτυχία ενημέρωσης βήματος. Προσπαθήστε ξανά`,
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
        this.recipeService.addStep(stepData, this.recipeId).subscribe({
          next: (data) => {
            this.isCreated = true;
            this.step = data;
            this.stepId = data.id.toString();
            this.snackBar.open(`To βήμα δημιουργήθηκε επιτυχώς!`, 'Κλείσιμο', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          },
          error: (err) => {
            console.error('Error creating item:', err);
            this.snackBar.open(
              `Αποτυχία δημιουργίας βήματος. Προσπαθήστε ξανά.`,
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
  goBackToList(result: number): void {
    this.router.navigate(['recipe/edit/', this.recipeId], {
      queryParams: { selectedTabIndex: result },
    });
  }

  goBack(): void {
    this.location.back();
  }
}
