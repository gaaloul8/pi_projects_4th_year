import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class QuizService {
    private baseUrl = 'http://localhost:8081/quiz';
   // private token ="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmYXRtYTEyNEBlc3ByaXQudG4iLCJpYXQiOjE3MTIwOTgyNjYsImV4cCI6MTcxMjE4NDY2Nn0.YGyVTDbY2GVz9xlaQQ4BDzHN5gPut5_dnfoXuLHkZkw"
    constructor(private http: HttpClient) { }
 createHeaders(): HttpHeaders {
        return new HttpHeaders({
         //   'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        });
    }
    addQuiz(quiz: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/add`, quiz);
    }

    getAllQuizzes(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/all`);
    }

    getAllQuizzesAllowedToPublish(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/allowedToPublish`);
    }
/*
    getAllQuizzes(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/all`, { headers: this.createHeaders() });
    }*/

    updateQuiz(quiz: any): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/update`, quiz);
    }
    publishQuiz(quiz:any):Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/publish`, quiz);
    }

    unpublishQuiz(quiz:any):Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/unpublish`, quiz);
    }

    getQuizById(id: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/getQuiz/${id}`);
    }


    deleteQuiz(quiz: any): Observable<any> {
        return this.http.delete(`${this.baseUrl}/delete `, { body: quiz });
    }


}
