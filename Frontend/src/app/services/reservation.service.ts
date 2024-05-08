import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../interfaces/reservation';
import { Observable } from 'rxjs';
import { User } from './reward.service';
import { UserModel } from '../models/userModel';
 

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = 'http://localhost:8081';
  //private token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcmlqLm9iYmFAZXNwcml0LnRuIiwiaWF0IjoxNzE0Mzg3MzQ0LCJleHAiOjE3MTQ0NzM3NDR9.Vu543TP1uFEpVzRuyVyXbE8k32CZGamH5Hcd_BJwiLI'
  
  private token =  localStorage.getItem('jwtAccessToken');
  constructor(private http: HttpClient) { }

  getUser(){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<UserModel>(`${this.baseUrl}/reservation/getuser `,{ headers: headers });
  }

  addReservation(idEvent: number, reservation: Reservation): Observable<Reservation> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post<Reservation>(`${this.baseUrl}/reservation/addReservation/${idEvent}`,reservation , { headers: headers });
  } 


    getAllReservationsForUser(): Observable<Reservation[]> {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      });
      return this.http.get<Reservation[]>(`${this.baseUrl}/reservation/getAllReservation`,{ headers: headers });
    }

    deleteReservation(idR: number){
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      });
      return this.http.delete<void>(`${this.baseUrl}/reservation/deleteReservation/${idR}`,{ headers: headers });
    }
    checkuser(iduser:number,idevent:number): Observable<boolean> {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      });
      return this.http.get<boolean>(`${this.baseUrl}/reservation/getuserandevent/${idevent}/${iduser}`,{ headers: headers });
    }
   
}
