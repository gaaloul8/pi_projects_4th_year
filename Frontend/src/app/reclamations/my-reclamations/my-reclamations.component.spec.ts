import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReclamationsComponent } from './my-reclamations.component';

describe('MyReclamationsComponent', () => {
  let component: MyReclamationsComponent;
  let fixture: ComponentFixture<MyReclamationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyReclamationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyReclamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
