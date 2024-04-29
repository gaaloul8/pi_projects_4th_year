import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {
  private baseUrl = 'http://localhost:8081/forums';
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLmRvZUBlc3ByaXQudG4iLCJpYXQiOjE3MTQyMTQ1ODMsImV4cCI6MTcxNDMwMDk4M30.uKbGuAi1pIwYLovGbcqPkZ3y30KEKB-ZO_DKMr0XsKQ';

  constructor(private http: HttpClient) { }

  shareOnFacebook(message: string): Observable<string> {
    const url = `${this.baseUrl}/share-on-facebook`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}` 
    }); 
    // Append the message as a query parameter
    const params = new HttpParams().set('message', message);
    return this.http.post<string>(url, {}, { headers, params });
  }
}
