import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterWithCardComponent } from './register-with-card.component';

describe('RegisterWithCardComponent', () => {
  let component: RegisterWithCardComponent;
  let fixture: ComponentFixture<RegisterWithCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterWithCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterWithCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
