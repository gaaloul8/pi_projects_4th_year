import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../interfaces/comment';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }
    private baseUrl = environment.backendUrl;

   // private baseUrl = 'http://localhost:8081/comments';
  private token = localStorage.getItem('jwtAccessToken');
  addComment(content: string, postId: number): Observable<Comment> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });
    return this.http.post<Comment>(`${this.baseUrl}/comments/add/${postId}`,{content} , { headers: headers });
  }

  updateComment(comment: Comment): Observable<Comment> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });
    return this.http.put<Comment>(`${this.baseUrl}/comments/update`, comment, { headers: headers  });
  }

  getAllComments(): Observable<Comment[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });
    return this.http.get<Comment[]>(`${this.baseUrl}/comments/getall`,{ headers: headers  });
  }

  getCommentById(id: number): Observable<Comment> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
  });
    return this.http.get<Comment>(`${this.baseUrl}/comments/${id}`, { headers: headers  });
  }

  deleteComment(id: number): Observable<Comment> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.delete<Comment>(`${this.baseUrl}/comments/${id}`, { headers: headers  });
  }
  getCommentsForPost(postId: number): Observable<Comment[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });
    return this.http.get<Comment[]>(`${this.baseUrl}/comments/findbyPost/${postId}`, { headers: headers  });
  }


}
export { Comment };


