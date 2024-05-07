import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FacebookService {
  //private baseUrl = 'http://localhost:8081/forums';
    private baseUrl = environment.backendUrl;

    private token = localStorage.getItem('jwtAccessToken');

  constructor(private http: HttpClient) { }

  shareOnFacebook(message: string): Observable<string> {
    const url = `${this.baseUrl}/forums/share-on-facebook`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    // Append the message as a query parameter
    const params = new HttpParams().set('message', message);
    return this.http.post<string>(url, {}, { headers, params });
  }
}
