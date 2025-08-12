import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipeIngredientComponent } from './add-recipe-ingredient.component';

describe('AddRecipeIngredientComponent', () => {
  let component: AddRecipeIngredientComponent;
  let fixture: ComponentFixture<AddRecipeIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecipeIngredientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecipeIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
