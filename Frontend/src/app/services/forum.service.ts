import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ForumService {

 // private baseUrl = 'http://localhost:8081/forums';
    private baseUrl = environment.backendUrl;

  private token =  localStorage.getItem('jwtAccessToken');




  constructor(private http: HttpClient) { }

  getAllForums(): Observable<Forum[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<Forum[]>(`${this.baseUrl}/forums/getAllForums`, { headers: headers });
  }
  getUser(): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<User>(`${this.baseUrl}/forums/getuser`, { headers: headers });
  }
  createForum(forum: Forum): Observable<Forum> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });
    return this.http.post<Forum>(`${this.baseUrl}/forums/addForum`, forum, { headers: headers });
  }

  getForumsWithQuestionsAndResponses(): Observable<Object[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<Object[]>(`${this.baseUrl}/forums/getForumWithQuestiondAndResponse`,{ headers: headers });
  }

  getForumsWithBestAnswers(): Observable<Object[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<Object[]>(`${this.baseUrl}/forums/getForumWithBestAnswers`,{ headers: headers });
  }
  updateForum(id:number,forum: Forum): Observable<Forum> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });
    return this.http.put(`${this.baseUrl}/forums/${id}`, forum, { headers: headers });
  }
  deleteForum(forumId: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.delete<void>(`${this.baseUrl}/forums/${forumId}`, { headers: headers });
  }
  likeForum(forumId: number): Observable<Forum> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.put<Forum>(`${this.baseUrl}/forums/like/${forumId}`, null, { headers: headers });
  }

  dislikeForum(forumId: number): Observable<Forum> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.put<Forum>(`${this.baseUrl}/forums/dislike/${forumId}`, null, { headers: headers });
  }
  searchForumByStatus(status: string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<Forum[]>(`${this.baseUrl}/forums/searchByStatus/${status}`, { headers: headers });}

  getForumById(forumId: number): Observable<Forum> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<Forum>(`${this.baseUrl}/forums/${forumId}`, { headers: headers });
  }
  detectLanguage(text: string): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post<string>(`${this.baseUrl}/forums/detectLanguage`, text, { responseType: 'text' as 'json' });
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
  status?: ForumStatus;
  numQuestions?: number;
}

export enum ForumStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

export interface User {
  id_user?: number;
  firstName?: string;
  lastName?: string;
  password?: string;
  resetToken?: string;
  email?: string;
  role?: string;
  profilePicture?: string;
  identifiant?: string;
  niveau?: string;
}

export interface Question {
  questionId?: number;
  title?: string;
  content?: string;
  createdAt?: Date;
  closed?: boolean;
  author?: User;
  upvotes?:number;
  downvotes?:number;
  forum?:Forum;
}
export interface Response {
  responseId?: number;
  author?: User;
  createdAt?: Date;
  content?: string;
  accepted?: boolean;
  reported?: boolean;
  upvotes?: number;
  question?: Question;
  editing?: boolean;
}
export interface QuestionWithTags {
  question: Question;
  tags: string[];
}


