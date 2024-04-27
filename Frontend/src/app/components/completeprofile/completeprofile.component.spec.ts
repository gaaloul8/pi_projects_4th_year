import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteprofileComponent } from './completeprofile.component';

describe('CompleteprofileComponent', () => {
  let component: CompleteprofileComponent;
  let fixture: ComponentFixture<CompleteprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompleteprofileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompleteprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
