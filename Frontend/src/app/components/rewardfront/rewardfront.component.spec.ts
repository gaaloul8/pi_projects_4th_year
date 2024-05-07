import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardfrontComponent } from './rewardfront.component';

describe('RewardfrontComponent', () => {
  let component: RewardfrontComponent;
  let fixture: ComponentFixture<RewardfrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RewardfrontComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RewardfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
