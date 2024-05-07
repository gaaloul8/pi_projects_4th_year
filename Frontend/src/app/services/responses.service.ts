import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Forum, Response } from './forum.service';
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ResponsesService {
    private baseUrl = environment.backendUrl;

   // private baseUrl = 'http://localhost:8081/responses';
  private token = localStorage.getItem('jwtAccessToken');

  constructor(private http: HttpClient) { }
  createResponse(response: Response): Observable<Response> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });
    return this.http.post<Response>(`${this.baseUrl}/responses/addResponse`, response, { headers: headers });
  }
  getAllResponsesByQuestionId(questionId: number): Observable<Response[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<Response[]>(`${this.baseUrl}/responses/response/${questionId}`, { headers: headers });
  }
  getAllResponses(): Observable<Response[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<Response[]>(`${this.baseUrl}/responses/getAllResponses`, { headers: headers });
  }
  upvoteResponse(responseId: number): Observable<Response> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.put<Forum>(`${this.baseUrl}/responses/upvote/${responseId}`, null, { headers: headers });
  }

  downvoteResponse(responseId: number): Observable<Response> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.put<Forum>(`${this.baseUrl}/responses/downvote/${responseId}`, null, { headers: headers });
  }
}
