import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Registercard2Component } from './registercard2.component';

describe('Registercard2Component', () => {
  let component: Registercard2Component;
  let fixture: ComponentFixture<Registercard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registercard2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Registercard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
