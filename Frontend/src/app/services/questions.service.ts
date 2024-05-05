import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Forum, Question } from './forum.service';


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private baseUrl = 'http://localhost:8081/questions';
  private token = localStorage.getItem('jwtAccessToken');


  constructor(private http: HttpClient) { }

  createQuestion(question: Question): Observable<Question> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });
    return this.http.post<Question>(`${this.baseUrl}/addQuestion`, question, { headers: headers });
  }
  getAllQuestions(): Observable<Question[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<Question[]>(`${this.baseUrl}/getAllQuestions`, { headers: headers });
  }
  
  getAllQuestionsByForumId(forumId: number): Observable<Question[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<Question[]>(`${this.baseUrl}/forum/${forumId}`, { headers: headers });
  }
  getQuestionById(questionId: number): Observable<Question> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<Question>(`${this.baseUrl}/${questionId}`, { headers: headers });
  }
  getTags(questionContent: string): Observable<string[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post<string[]>(`${this.baseUrl}/summarize`, questionContent, { headers: headers });
  }
  SentimentAnalyzer(questionContent: string): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post<string>(`${this.baseUrl}/analyzeSentiment`, questionContent, { headers: headers  });
  }
  upvoteQuestion(QuestionId: number): Observable<Question> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.put<Forum>(`${this.baseUrl}/upvote/${QuestionId}`, null, { headers: headers });
  }

  downvoteQuestion(QuestionId: number): Observable<Question> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.put<Forum>(`${this.baseUrl}/downvote/${QuestionId}`, null, { headers: headers });
  }

  
}

