import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../interfaces/event';


@Injectable({
  providedIn: 'root'
})
export class EventService {
 private baseUrl = 'http://localhost:8081';
 private token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJicmFoaW0ub2JiYUBlc3ByaXQudG4iLCJpYXQiOjE3MTMyMTc4ODAsImV4cCI6MTcxMzMwNDI4MH0.RMNZQIUZ_VCGTiRTdAVcckw-7RCpttCcPQ2QkqbC_5Y'
  constructor(private http: HttpClient) { }

  public getAllEvent(): Observable<Event[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<Event[]>(`${this.baseUrl}/getAllEvent`, { headers: headers });} 


    public addNewEvent(event :Event): Observable<Event[]> {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token,   
         'Content-Type': 'application/json'
      });
      return this.http.post<Event[]>(`${this.baseUrl}/addEvent`,event, { headers: headers });} 

      deleteEvent(idEvent: number): Observable<void> {
        const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + this.token
        });
        return this.http.delete<void>(`${this.baseUrl}/${idEvent}`, { headers: headers });
      }
      
      updateEvent(event: Event): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.put(`${this.baseUrl}/updateEvent`, event, httpOptions);
    }
    searchEventByType(type: string){
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      });
      return this.http.get<Event[]>(`${this.baseUrl}/searchByType/${type}`, { headers: headers });} 
    

    searchEventByDate(date: Date): Observable<any[]> {
      // Formater la date en format ISO 8601 pour correspondre au format attendu par Spring
      const isoDate = date.toISOString();
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      });
      // Appeler l'endpoint Spring avec la date en tant que paramètre de requête
      return this.http.get<any[]>(`${this.baseUrl}/searchByDate/${isoDate}`, { headers: headers });
    }
  }
    


