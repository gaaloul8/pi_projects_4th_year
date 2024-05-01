import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class QuizService {
    private baseUrl = 'http://localhost:8081/quiz';
    private token =  localStorage.getItem('jwtAccessToken');

    constructor(private http: HttpClient) { }
 /*createHeaders(): HttpHeaders {
        return new HttpHeaders({
           'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        });
    }*/
    addQuiz(quiz: any): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        });
        return this.http.post(`${this.baseUrl}/add`, quiz,{ headers: headers });
    }

    getAllQuizzes(): Observable<any[]> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        });
        return this.http.get<any[]>(`${this.baseUrl}/all`,{ headers: headers });
    }

    getAllQuizzesAllowedToPublish(): Observable<any[]> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        });
        return this.http.get<any[]>(`${this.baseUrl}/allowedToPublish`,{ headers: headers });
    }
/*
    getAllQuizzes(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/all`, { headers: this.createHeaders() });
    }*/

    updateQuiz(quiz: any): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        });
        return this.http.put<any>(`${this.baseUrl}/update`, quiz,{ headers: headers });
    }
    publishQuiz(quiz:any):Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        });
        return this.http.put<any>(`${this.baseUrl}/publish`, quiz,{ headers: headers });
    }

    unpublishQuiz(quiz:any):Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        });
        return this.http.put<any>(`${this.baseUrl}/unpublish`, quiz,{ headers: headers });
    }

    getQuizById(id: number): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        });
        return this.http.get<any>(`${this.baseUrl}/getQuiz/${id}`,{ headers: headers });
    }


    deleteQuiz(quiz: any): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        });
        return this.http.delete(`${this.baseUrl}/delete `, { body: quiz , headers: headers });
    }


}
