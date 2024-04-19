import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class QuestionQuizService {

    private baseUrl = 'http://localhost:8081/questionq';

    constructor(private http: HttpClient) { }

    getQuestionsByQuizId(quizId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/by-quiz/${quizId}`);
    }

    addQuestionToQuiz(question: any, quizId: number): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/${quizId}/questions`, question);
    }

    updateQuestion(question: any): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/update`, question);
    }

    deleteQuestion(question: any): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/delete`, { body: question });
    }

    getAllQuestions(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/all`);
    }
}
