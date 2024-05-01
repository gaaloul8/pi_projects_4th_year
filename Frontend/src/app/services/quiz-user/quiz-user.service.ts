import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class QuizUserService {

    private baseUrl = 'http://localhost:8081/passerQuiz';
    private token =  localStorage.getItem('jwtAccessToken');
    constructor(private http: HttpClient) { }
    /*createHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        });
    }*/
    passerQuiz(quizUser: any, id: number): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        });
        return this.http.post<any>(`${this.baseUrl}/${id}/passerQuiz`, quizUser,{ headers: headers });
    }


    getAllQuizUsers(): Observable<any[]> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });
        return this.http.get<any[]>(`${this.baseUrl}/all`,{ headers: headers });
    }
    getQuizUserParticipationDatesAndCounts(): Observable<any[]> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });
        return this.http.get<any[]>(`${this.baseUrl}/getQuizUserParticipationDatesAndCounts`,{ headers: headers });
    }

    retrieveQuizUserParticipation(idQuiz: number): Observable<any[]> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });
        return this.http.get<any[]>(`${this.baseUrl}/all/${idQuiz}`,{ headers: headers });
    }


    retrieveAllDocters(): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });
        return this.http.get<any>(`${this.baseUrl}/doctors`,{ headers: headers });
    }
}
