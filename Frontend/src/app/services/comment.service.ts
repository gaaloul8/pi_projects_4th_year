import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:8081/comments'; 
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYWRva0Blc3ByaXQudG4iLCJpYXQiOjE3MTQyMjE4NjgsImV4cCI6MTcxNDMwODI2OH0.xOZBqJt88F2WFkfqPeFJr7Q59PpKwfnk3Ounsy0J9vQ'; 
  addComment(content: string, postId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}/add/${postId}`, { content }, { headers });
  }

  updateComment(comment: Comment): Observable<Comment> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });
    return this.http.put<Comment>(`${this.baseUrl}/update`, comment, { headers });
  }

  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/getall`);
  }

  getCommentById(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.baseUrl}/${id}`);
  }

  deleteComment(id: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
  }
  
}
export { Comment };


