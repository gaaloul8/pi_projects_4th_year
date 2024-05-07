import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post'; // Assuming you have a Post model
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = 'http://localhost:8081/posts'; // Assuming this is your backend base URL
  private token = localStorage.getItem('jwtAccessToken');

  constructor(private http: HttpClient) { }


  addPost(content: string, image: File): Observable<Post> {
    const formData = new FormData();
    formData.append('content', content);
    formData.append('image', image);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post<Post>(`${this.baseUrl}/add`, formData, { headers: headers });
  }

  updateReward(postId: number, content: string, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('content', content);

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
  
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
  });
    localStorage
    return this.http.get(`${this.baseUrl}/getall`,{ headers: headers });
  }

  getPostById(id: number): Observable<Post> {
    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
  });
    return this.http.get<Post>(`${this.baseUrl}/${id}`, { headers : headers });
  }

  deletePost(id: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: headers });
  }

  getPostsByDate(postDate: Date): Observable<Post[]> {
    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
  });
    return this.http.get<Post[]>(`${this.baseUrl}/getByDate/${postDate}`, { headers: headers });
  }
  getMonthlyPostsCounts(): Observable<any> {
    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
  });
    return this.http.get<any>(`${this.baseUrl}/monthly-count`, { headers: headers });
}
likePost(postId: number): Observable<Post> {
  
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token
  });
  return this.http.put<Post>(`${this.baseUrl}/like/${postId}`,null, { headers: headers});
}

// Add a method to dislike a post
dislikePost(postId: number): Observable<Post> {
  
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token
  });
  return this.http.put<Post>(`${this.baseUrl}/dislike/${postId}`,null, {headers: headers});
}
getUser(): Observable<UserModel> {
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token
  });
  return this.http.get<UserModel>(`${this.baseUrl}/getconnecteduser`, { headers: headers });
}



}
export { Post };