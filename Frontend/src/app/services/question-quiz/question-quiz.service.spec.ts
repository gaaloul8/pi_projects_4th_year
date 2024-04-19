import { TestBed } from '@angular/core/testing';

import { QuestionQuizService } from './question-quiz.service';

describe('QuestionQuizService', () => {
  let service: QuestionQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
