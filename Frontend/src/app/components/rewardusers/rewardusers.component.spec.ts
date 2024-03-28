import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardusersComponent } from './rewardusers.component';

describe('RewardusersComponent', () => {
  let component: RewardusersComponent;
  let fixture: ComponentFixture<RewardusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RewardusersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RewardusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
