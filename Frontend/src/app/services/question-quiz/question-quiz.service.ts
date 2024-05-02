import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class QuestionQuizService {

    private baseUrl = 'http://localhost:8081/questionq';
    private token =  localStorage.getItem('jwtAccessToken');

    constructor(private http: HttpClient) { }
  /*  createHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        });
    }*/
    getQuestionsByQuizId(quizId: number): Observable<any[]> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        });
        return this.http.get<any[]>(`${this.baseUrl}/by-quiz/${quizId}`,{ headers: headers });
    }

    addQuestionToQuiz(question: any, quizId: number): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        });
        return this.http.post<any>(`${this.baseUrl}/${quizId}/questions`, question,{ headers: headers });
    }

    updateQuestion(question: any): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        });
        return this.http.put<any>(`${this.baseUrl}/update`, question,{ headers: headers });
    }

    deleteQuestion(question: any): Observable<void> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        });
        return this.http.delete<void>(`${this.baseUrl}/delete`, { body: question , headers: headers  });
    }

    getAllQuestions(): Observable<any[]> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        });
        return this.http.get<any[]>(`${this.baseUrl}/all`,{ headers: headers });
    }
}
