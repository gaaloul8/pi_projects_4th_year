import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReservationEventComponent } from './list-reservation-event.component';

describe('ListReservationEventComponent', () => {
  let component: ListReservationEventComponent;
  let fixture: ComponentFixture<ListReservationEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListReservationEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListReservationEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
