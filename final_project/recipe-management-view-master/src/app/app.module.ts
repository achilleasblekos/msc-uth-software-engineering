import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeListComponent } from './recipe/list/list.component';
import { RecipeExecuteComponent } from './recipe/execute/execute.component';
import { RecipeCreateComponent } from './recipe/create/create.component';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { AddRecipeIngredientComponent } from './dialogs/add-recipe-ingredient/add-recipe-ingredient.component';
import { EditRecipeIngredientComponent } from './dialogs/edit-recipe-ingredient/edit-recipe-ingredient.component';
import { StepListComponent } from './step/step-list/step-list.component';
import { StepCreateEditComponent } from './step/step-create-edit/step-create-edit.component';
import { AddStepIngredientComponent } from './dialogs/add-step-ingredient/add-step-ingredient.component';
import { EditStepIngredientComponent } from './dialogs/edit-step-ingredient/edit-step-ingredient.component';
import { HeaderComponent } from './header/header.component';
import { ImageComponent } from './image/image.component';


@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeExecuteComponent,
    RecipeCreateComponent,
    AddRecipeIngredientComponent,
    EditRecipeIngredientComponent,
    StepListComponent,
    StepListComponent,
    StepCreateEditComponent,
    AddStepIngredientComponent,
    EditStepIngredientComponent,
    HeaderComponent,
    ImageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatGridListModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
