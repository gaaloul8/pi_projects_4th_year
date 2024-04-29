import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionstatComponent } from './transactionstat.component';

describe('TransactionstatComponent', () => {
  let component: TransactionstatComponent;
  let fixture: ComponentFixture<TransactionstatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionstatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
