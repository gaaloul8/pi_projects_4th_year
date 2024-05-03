import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReservationFrontComponent } from './list-reservation-front.component';

describe('ListReservationFrontComponent', () => {
  let component: ListReservationFrontComponent;
  let fixture: ComponentFixture<ListReservationFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListReservationFrontComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListReservationFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
