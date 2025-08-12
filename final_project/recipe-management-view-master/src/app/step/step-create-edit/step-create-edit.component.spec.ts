import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepCreateEditComponent } from './step-create-edit.component';

describe('StepCreateEditComponent', () => {
  let component: StepCreateEditComponent;
  let fixture: ComponentFixture<StepCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
