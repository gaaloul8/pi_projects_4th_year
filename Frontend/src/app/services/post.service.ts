import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post'; // Assuming you have a Post model

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = 'http://localhost:8081/posts'; // Assuming this is your backend base URL
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYWRva0Blc3ByaXQudG4iLCJpYXQiOjE3MTQyMjE4NjgsImV4cCI6MTcxNDMwODI2OH0.xOZBqJt88F2WFkfqPeFJr7Q59PpKwfnk3Ounsy0J9vQ'; // Assuming you have authentication

  constructor(private http: HttpClient) { }


  addPost(content: string, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('content', content);
    formData.append('image', image);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(`${this.baseUrl}/add`, formData, { headers: headers });
  }

  updateReward(postId: number, post: Post, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('content', post.content);

    const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
    });

    return this.http.put<Post>(`${this.baseUrl}/updatepost/${postId}`, formData, { headers: headers });
}

  updatePost(post: Post): Observable<Post> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });
    return this.http.put<Post>(`${this.baseUrl}/update`, post, { headers: headers });
  }

  getAllPosts() {
    return this.http.get(`${this.baseUrl}/getall`);
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
  getMonthlyPostsCounts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/monthly-count`);
}



}
export { Post };