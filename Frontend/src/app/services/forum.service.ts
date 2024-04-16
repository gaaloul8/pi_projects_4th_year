import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private baseUrl = 'http://localhost:8081/forums';
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5YXMub2JiYUBlc3ByaXQudG4iLCJpYXQiOjE3MTI4NTA5MjcsImV4cCI6MTcxMjkzNzMyN30.9g17kC7eHN1E9U0uhqd4IWQ4VsA44q9yXQ0t1JU4ZB0';


  constructor(private http: HttpClient) { }

  getAllForums(): Observable<Forum[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<Forum[]>(`${this.baseUrl}/getAllForums`, { headers: headers });
  }
  createForum(forum: Forum): Observable<Forum> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });
    return this.http.post<Forum>(`${this.baseUrl}/addForum`, forum, { headers: headers });
  }
  deleteForum(forumId: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.delete<void>(`${this.baseUrl}/${forumId}`, { headers: headers });
  }
  likeForum(forumId: number): Observable<Forum> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.put<Forum>(`${this.baseUrl}/like/${forumId}`, null, { headers: headers });
  }

  dislikeForum(forumId: number): Observable<Forum> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.put<Forum>(`${this.baseUrl}/dislike/${forumId}`, null, { headers: headers });
  }
}


export interface Forum {
  forumId?: number;
  topic?: string;
  forumOwner?: User;
  createdAt?: Date;
  content?: string;
  likes?: number;
  closed?: boolean;
  isLiked?: boolean;
}
export interface User {
  id_user?: number;
  firstName?: string;
  lastName?: string;
  password?: string;
  resetToken?: string;
  email?: string;
  role?: string;
}

export interface Question {
  questionId?: number;
  title?: string;
}