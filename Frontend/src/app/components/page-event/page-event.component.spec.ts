import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEventComponent } from './page-event.component';

describe('PageEventComponent', () => {
  let component: PageEventComponent;
  let fixture: ComponentFixture<PageEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
