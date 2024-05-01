import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Forum, Response } from './forum.service';


@Injectable({
  providedIn: 'root'
})
export class ResponsesService {
  private baseUrl = 'http://localhost:8081/responses';
  private token = localStorage.getItem('jwtAccessToken');

  constructor(private http: HttpClient) { }
  createResponse(response: Response): Observable<Response> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });
    return this.http.post<Response>(`${this.baseUrl}/addResponse`, response, { headers: headers });
  }
  getAllResponsesByQuestionId(questionId: number): Observable<Response[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<Response[]>(`${this.baseUrl}/response/${questionId}`, { headers: headers });
  }
  getAllResponses(): Observable<Response[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<Response[]>(`${this.baseUrl}/getAllResponses`, { headers: headers });
  }
  upvoteResponse(responseId: number): Observable<Response> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.put<Forum>(`${this.baseUrl}/upvote/${responseId}`, null, { headers: headers });
  }

  downvoteResponse(responseId: number): Observable<Response> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.put<Forum>(`${this.baseUrl}/downvote/${responseId}`, null, { headers: headers });
  }
}
