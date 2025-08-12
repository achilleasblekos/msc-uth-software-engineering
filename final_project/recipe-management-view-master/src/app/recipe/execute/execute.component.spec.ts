import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeExecuteComponent } from './execute.component';

describe('RecipeExecuteComponent', () => {
  let component: RecipeExecuteComponent;
  let fixture: ComponentFixture<RecipeExecuteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeExecuteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeExecuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
