import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationOverviewComponent } from './reclamation-overview.component';

describe('ReclamationOverviewComponent', () => {
  let component: ReclamationOverviewComponent;
  let fixture: ComponentFixture<ReclamationOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReclamationOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReclamationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
