import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Forum, Question } from './forum.service';
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
    private baseUrl = environment.backendUrl;

    // private baseUrl = 'http://localhost:8081/questions';
  private token = localStorage.getItem('jwtAccessToken');


  constructor(private http: HttpClient) { }

  createQuestion(question: Question): Observable<Question> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });
    return this.http.post<Question>(`${this.baseUrl}/questions/addQuestion`, question, { headers: headers });
  }
  getAllQuestions(): Observable<Question[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<Question[]>(`${this.baseUrl}/questions/getAllQuestions`, { headers: headers });
  }

  getAllQuestionsByForumId(forumId: number): Observable<Question[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<Question[]>(`${this.baseUrl}/questions/forum/${forumId}`, { headers: headers });
  }
  getQuestionById(questionId: number): Observable<Question> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<Question>(`${this.baseUrl}/questions/${questionId}`, { headers: headers });
  }
  getTags(questionContent: string): Observable<string[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post<string[]>(`${this.baseUrl}/questions/summarize`, questionContent, { headers: headers });
  }
  SentimentAnalyzer(questionContent: string): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post<string>(`${this.baseUrl}/questions/analyzeSentiment`, questionContent, { headers: headers  });
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

