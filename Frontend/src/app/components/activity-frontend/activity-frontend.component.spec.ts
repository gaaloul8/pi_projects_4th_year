import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityFrontendComponent } from './activity-frontend.component';

describe('ActivityFrontendComponent', () => {
  let component: ActivityFrontendComponent;
  let fixture: ComponentFixture<ActivityFrontendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityFrontendComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityFrontendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
