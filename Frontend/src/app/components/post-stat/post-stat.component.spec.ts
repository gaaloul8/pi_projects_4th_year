import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostStatComponent } from './post-stat.component';

describe('PostStatComponent', () => {
  let component: PostStatComponent;
  let fixture: ComponentFixture<PostStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostStatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
