import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewCategoryForm } from './nuevo-formulario';

describe('NewCategoryForm', () => {
  let component: NewCategoryForm;
  let fixture: ComponentFixture<NewCategoryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCategoryForm],
    }).compileComponents();

    fixture = TestBed.createComponent(NewCategoryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
