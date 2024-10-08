import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumBackComponent } from './forum-back.component';

describe('ForumBackComponent', () => {
  let component: ForumBackComponent;
  let fixture: ComponentFixture<ForumBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForumBackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForumBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
