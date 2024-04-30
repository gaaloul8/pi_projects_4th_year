import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../interfaces/event';
import { Image } from 'primeng/image';


@Injectable({
  providedIn: 'root'
})
export class EventService {
 private baseUrl = 'http://localhost:8081';
 //private token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcmlqLm9iYmFAZXNwcml0LnRuIiwiaWF0IjoxNzEzNjQ2MjI4LCJleHAiOjE3MTM3MzI2Mjh9.IzKw5U7ldpVPe9ToCAGtPmRTcm0SdVza6nCfx2yubYA'
  constructor(private http: HttpClient) { }

  public getAllEvent(): Observable<Event[]> {
    /*const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });*/
    return this.http.get<Event[]>(`${this.baseUrl}/event/getAllEvent`);
  } 


 public addNewEvent(event :Event): Observable<Event[]> {
      return this.http.post<Event[]>(`${this.baseUrl}/event/addEvent`,event);
    
    } 

      deleteEvent(idEvent: number): Observable<void> {
      
        return this.http.delete<void>(`${this.baseUrl}/event/${idEvent}`);
      }
      
      updateEvent(event: Event): Observable<any> {
      
        return this.http.put(`${this.baseUrl}/event/updateEvent`,event);
    }

    /*searchEventByType(type: string){
      return this.http.get<Event[]>(`${this.baseUrl}/event/searchByType/${type}`);} 
    */

    searchEventByType(types: string[]){
        // Join the array of types into a comma-separated string
        const typeString = types.join(',');
        // Use the comma-separated string as a query parameter in the URL
        return this.http.get<Event[]>(`${this.baseUrl}/event/searchByType?types=${typeString}`);
      }

    searchEventByDate(date: Date): Observable<any[]> {
      const isoDate = date.toISOString();
      return this.http.get<any[]>(`${this.baseUrl}/event/searchByDate/${isoDate}`);
    }

    searchEventByName(name : String): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/event/searchByName/${name}`);
    }
    getEventFeedbackStatistics(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/event/feedbackStatistics`);
    }
  }
    


