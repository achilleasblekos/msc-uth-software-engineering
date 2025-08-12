import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';

import { RecipeListComponent } from './list/list.component';
import { RecipeExecuteComponent } from './execute/execute.component';
import { RecipeCreateComponent } from './create/create.component';


@NgModule({
  declarations: [
    // RecipeListComponent,
    // RecipeCreateComponent,
    // RecipeExecuteComponent,
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule
  ]
})
export class RecipeModule { }
