import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStepIngredientComponent } from './edit-step-ingredient.component';

describe('EditStepIngredientComponent', () => {
  let component: EditStepIngredientComponent;
  let fixture: ComponentFixture<EditStepIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStepIngredientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStepIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
