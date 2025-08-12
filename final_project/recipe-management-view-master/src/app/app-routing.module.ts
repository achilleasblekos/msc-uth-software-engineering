import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeExecuteComponent } from './recipe/execute/execute.component';
import { RecipeCreateComponent } from './recipe/create/create.component';
import { RecipeListComponent } from './recipe/list/list.component';
import { StepCreateEditComponent } from './step/step-create-edit/step-create-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipe/home', pathMatch: 'full' }, // Αρχική διαδρομή
  { path: 'recipe/home', component: RecipeListComponent }, // Λίστα Συνταγών
  { path: 'recipe/create', component: RecipeCreateComponent }, // Δημιουργία Συνταγής
  { path: 'recipe/edit/:id', component: RecipeCreateComponent }, // Επεξεργασία Συνταγής EditComponent
  {
    path: 'step/create/:recipeId/:selectedTabIndex',
    component: StepCreateEditComponent,
  }, // Δημιουργία Βήματος
  {
    path: 'step/edit/:id/:recipeId/:selectedTabIndex',
    component: StepCreateEditComponent,
  }, // Επεξεργασία Βήματος EditComponent
  { path: 'recipe/execute/:id', component: RecipeExecuteComponent }, // Εκτέλεση Συνταγής
  { path: '**', redirectTo: '/recipe/home' }, // Διαδρομή για μη έγκυρες URL
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
