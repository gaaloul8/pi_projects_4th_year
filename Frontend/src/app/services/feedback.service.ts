import { Injectable } from '@angular/core';
import { Feedback } from '../interfaces/feedback';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = 'http://localhost:8081';
  //private token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcmlqLm9iYmFAZXNwcml0LnRuIiwiaWF0IjoxNzEzNjIwMTcwLCJleHAiOjE3MTM3MDY1NzB9.TGjnP6zaHoK0SP4ZvyFv59SxuuPtYC5BN2kYtOwXnjU'
  constructor(private http: HttpClient) { }
  
  addFeedback(eventId: number, feedback: Feedback): Observable<Feedback> {
  
    return this.http.post<Feedback>(`${this.baseUrl}/feedback/addFeedback/${eventId}`, feedback);
  }


  deleteFeedBack(idFeedback: number): Observable<void> {
 
    return this.http.delete<void>(`${this.baseUrl}/feedback/deleteFeedback/${idFeedback}`);
  }

  getAllFeedbacksForUser(): Observable<Feedback[]> {
 
    return this.http.get<Feedback[]>(`${this.baseUrl}/feedback/getAllFeedBack`);
  }

       
  updateFeedback (feedback : Feedback): Observable<any> {
 
    return this.http.put(`${this.baseUrl}/feedback/updateFeedback`,feedback);
}
getFeedbackById(id: number): Observable<Feedback> {
  return this.http.get<Feedback>(`${this.baseUrl}/feedback/getFeedBackById/${id}`);
}

}
