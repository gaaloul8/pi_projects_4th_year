import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontClubComponent } from './front-club.component';

describe('FrontClubComponent', () => {
  let component: FrontClubComponent;
  let fixture: ComponentFixture<FrontClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontClubComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrontClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
