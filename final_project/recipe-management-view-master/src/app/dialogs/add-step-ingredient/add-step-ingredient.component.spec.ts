import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStepIngredientComponent } from './add-step-ingredient.component';

describe('AddStepIngredientComponent', () => {
  let component: AddStepIngredientComponent;
  let fixture: ComponentFixture<AddStepIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStepIngredientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStepIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
