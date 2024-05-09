import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationAssignComponent } from './reclamation-assign.component';

describe('ReclamationAssignComponent', () => {
  let component: ReclamationAssignComponent;
  let fixture: ComponentFixture<ReclamationAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReclamationAssignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReclamationAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
