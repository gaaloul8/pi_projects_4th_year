import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post'; // Assuming you have a Post model

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = 'http://localhost:8081/posts'; // Assuming this is your backend base URL
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYWRva0Blc3ByaXQudG4iLCJpYXQiOjE3MTM3MTI3MjksImV4cCI6MTcxMzc5OTEyOX0.6Swtj-z6GG6Dvt6NPi8eEeJxk6wZy2CE4dJqnYYEWNQ'; // Assuming you have authentication

  constructor(private http: HttpClient) { }


  addPost(post: Post): Observable<Post> {
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer ' + this.token,
    //   'Content-Type': 'multipart/form-data'
    // });
   const headers = new HttpHeaders().set('Accept', 'multipart/form-data');

    return this.http.post<Post>(`${this.baseUrl}/add`, post, { headers: headers });
  }

  updatePost(post: Post): Observable<Post> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });
    return this.http.put<Post>(`${this.baseUrl}/update`, post, { headers: headers });
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/getall`);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${id}`);
  }

  deletePost(id: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: headers });
  }

  getPostsByDate(postDate: Date): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/getByDate/${postDate}`);
  }

}
export { Post };

