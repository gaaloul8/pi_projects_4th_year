import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedReclamationsComponent } from './assigned-reclamations.component';

describe('AssignedReclamationsComponent', () => {
  let component: AssignedReclamationsComponent;
  let fixture: ComponentFixture<AssignedReclamationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedReclamationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignedReclamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
