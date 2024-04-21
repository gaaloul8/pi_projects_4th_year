import { TestBed } from '@angular/core/testing';

import { QuizUserService } from './quiz-user.service';

describe('QuizUserService', () => {
  let service: QuizUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
