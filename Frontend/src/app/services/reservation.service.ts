import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../interfaces/reservation';
import { Observable } from 'rxjs';
 

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = 'http://localhost:8081';
  //private token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcmlqLm9iYmFAZXNwcml0LnRuIiwiaWF0IjoxNzEzNjIwMTcwLCJleHAiOjE3MTM3MDY1NzB9.TGjnP6zaHoK0SP4ZvyFv59SxuuPtYC5BN2kYtOwXnjU'
  constructor(private http: HttpClient) { }

  addReservation(idEvent: number, reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.baseUrl}/reservation/addReservation/${idEvent}`,reservation);} 

    getAllReservationsForUser(): Observable<Reservation[]> {
      return this.http.get<Reservation[]>(`${this.baseUrl}/reservation/getAllReservation`);
    }

    deleteReservation(idR: number){
      return this.http.delete<void>(`${this.baseUrl}/reservation/deleteReservation/${idR}`);
    }
   
}
