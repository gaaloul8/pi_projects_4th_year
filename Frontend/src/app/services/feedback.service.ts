import { Injectable } from '@angular/core';
import { Feedback } from '../interfaces/feedback';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  //private baseUrl = 'http://localhost:8081';
    private baseUrl = environment.backendUrl;

    //token mta3 el clubManager
  private token =  localStorage.getItem('jwtAccessToken');

  constructor(private http: HttpClient) { }

  addFeedback(eventId: number, feedback: Feedback): Observable<Feedback> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post<Feedback>(`${this.baseUrl}/feedback/addFeedback/${eventId}`, feedback,{ headers: headers });
  }


  deleteFeedBack(idFeedback: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.delete<void>(`${this.baseUrl}/feedback/deleteFeedback/${idFeedback}`,{ headers: headers });
  }

  getAllFeedbacksForUser(): Observable<Feedback[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<Feedback[]>(`${this.baseUrl}/feedback/getAllFeedBack`,{ headers: headers });
  }


  updateFeedback (idfeedback : number, feedback : Feedback): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.put(`${this.baseUrl}/feedback/${idfeedback}`,feedback,{ headers: headers });
}


getFeedbackById(id: number): Observable<Feedback> {
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token
  });
  return this.http.get<Feedback>(`${this.baseUrl}/feedback/getFeedBackById/${id}`,{ headers: headers });
}

getFeedbackStatistics(): Observable<any[]> {
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token
  });
  return this.http.get<any[]>(`${this.baseUrl}/feedback/feedback/statistics`,{ headers: headers });
}

}
