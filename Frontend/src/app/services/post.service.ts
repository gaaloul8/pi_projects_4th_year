import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post'; // Assuming you have a Post model
import { UserModel } from '../models/userModel';

import {environment} from "../../environments/environment"; // Assuming you have a Post model

@Injectable({
  providedIn: 'root'
})
export class PostService {

  //private baseUrl = 'http://localhost:8081/posts'; // Assuming this is your backend base URL
    private baseUrl = environment.backendUrl;

    private token = localStorage.getItem('jwtAccessToken');

  constructor(private http: HttpClient) { }


  addPost(content: string, image: File): Observable<Post> {
    const formData = new FormData();
    formData.append('content', content);
    formData.append('image', image);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post<Post>(`${this.baseUrl}/posts/add`, formData, { headers: headers });
  }

  updateReward(postId: number, content: string, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('content', content);

    const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
    });

    return this.http.put<Post>(`${this.baseUrl}/posts/updatepost/${postId}`, formData, { headers: headers });
}

  updatePost(post: Post): Observable<Post> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });
    return this.http.put<Post>(`${this.baseUrl}/posts/update`, post, { headers: headers });
  }

  getAllPosts() {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
  });
    localStorage
    return this.http.get(`${this.baseUrl}/posts/getall`,{ headers: headers });
  }

  getPostById(id: number): Observable<Post> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
  });
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`, { headers : headers });
  }

  deletePost(id: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.delete<void>(`${this.baseUrl}/posts/${id}`, { headers: headers });
  }

  getPostsByDate(postDate: Date): Observable<Post[]> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
  });
    return this.http.get<Post[]>(`${this.baseUrl}/posts/getByDate/${postDate}`, { headers: headers });
  }
  getMonthlyPostsCounts(): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
  });
    return this.http.get<any>(`${this.baseUrl}/posts/monthly-count`, { headers: headers });
}
likePost(postId: number): Observable<Post> {

  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token
  });
  return this.http.put<Post>(`${this.baseUrl}/posts/like/${postId}`,null, { headers: headers});
}

// Add a method to dislike a post
dislikePost(postId: number): Observable<Post> {

  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token
  });
  return this.http.put<Post>(`${this.baseUrl}/posts/dislike/${postId}`,null, {headers: headers});
}
getUser(): Observable<UserModel> {
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token
  });
  return this.http.get<UserModel>(`${this.baseUrl}/getconnecteduser`, { headers: headers });
}



}
export { Post };
