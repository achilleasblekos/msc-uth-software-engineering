import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './list/list.component';
import { RecipeExecuteComponent } from './execute/execute.component';
import { RecipeCreateComponent } from './create/create.component';

const routes: Routes = [
  { path: 'recipe/list', component: RecipeListComponent },
  { path: 'recipe/create', component: RecipeCreateComponent },
  { path: 'recipe/edit/:id', component: RecipeCreateComponent },
  { path: 'recipe/execute/:id', component: RecipeExecuteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}
