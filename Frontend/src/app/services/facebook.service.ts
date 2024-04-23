import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {
  private baseUrl = 'http://localhost:8081/forums';
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtZWQxQGVzcHJpdC50biIsImlhdCI6MTcxMzI5MzcwMywiZXhwIjoxNzEzMzgwMTAzfQ.Bp0NYDMZI4ZFFQFvjx1f2dhW7yhV1sozPYpN7-HEFIE';

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
