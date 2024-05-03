import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountlockedComponent } from './accountlocked.component';

describe('AccountlockedComponent', () => {
  let component: AccountlockedComponent;
  let fixture: ComponentFixture<AccountlockedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountlockedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountlockedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
