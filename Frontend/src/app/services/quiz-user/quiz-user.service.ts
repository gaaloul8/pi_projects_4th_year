import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class QuizUserService {

    private baseUrl = 'http://localhost:8081/passerQuiz';

    constructor(private http: HttpClient) { }
    passerQuiz(quizUser: any, id: number): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/${id}/passerQuiz`, quizUser);
    }


    getAllQuizUsers(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/all`);
    }
}
