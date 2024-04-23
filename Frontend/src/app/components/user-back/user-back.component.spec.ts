import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBackComponent } from './user-back.component';

describe('UserBackComponent', () => {
  let component: UserBackComponent;
  let fixture: ComponentFixture<UserBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
