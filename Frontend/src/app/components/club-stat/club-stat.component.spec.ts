import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubStatComponent } from './club-stat.component';

describe('ClubStatComponent', () => {
  let component: ClubStatComponent;
  let fixture: ComponentFixture<ClubStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubStatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClubStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
