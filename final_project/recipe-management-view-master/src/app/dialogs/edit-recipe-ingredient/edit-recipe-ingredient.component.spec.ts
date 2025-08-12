import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecipeIngredientComponent } from './edit-recipe-ingredient.component';

describe('EditRecipeIngredientComponent', () => {
  let component: EditRecipeIngredientComponent;
  let fixture: ComponentFixture<EditRecipeIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRecipeIngredientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRecipeIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
