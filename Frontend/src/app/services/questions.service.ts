import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Forum, Question } from './forum.service';


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private baseUrl = 'http://localhost:8081/questions';
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtZWQxQGVzcHJpdC50biIsImlhdCI6MTcxMzI5MzcwMywiZXhwIjoxNzEzMzgwMTAzfQ.Bp0NYDMZI4ZFFQFvjx1f2dhW7yhV1sozPYpN7-HEFIE';


  constructor(private http: HttpClient) { }

  createQuestion(question: Question): Observable<Question> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });
    return this.http.post<Forum>(`${this.baseUrl}/addQuestion`, question, { headers: headers });
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

  
}

