import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeimageComponent } from './takeimage.component';

describe('TakeimageComponent', () => {
  let component: TakeimageComponent;
  let fixture: ComponentFixture<TakeimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TakeimageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TakeimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
