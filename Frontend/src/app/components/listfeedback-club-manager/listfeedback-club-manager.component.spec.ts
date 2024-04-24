import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListfeedbackClubManagerComponent } from './listfeedback-club-manager.component';

describe('ListfeedbackClubManagerComponent', () => {
  let component: ListfeedbackClubManagerComponent;
  let fixture: ComponentFixture<ListfeedbackClubManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListfeedbackClubManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListfeedbackClubManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
