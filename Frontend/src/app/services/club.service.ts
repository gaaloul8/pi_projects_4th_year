import { Club } from './../interfaces/club';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private baseUrl = 'http://localhost:8081/clubs';
  private token = localStorage.getItem('jwtAccessToken');

  constructor(private http: HttpClient) { }

  /*addClub(club: Club): Observable<Club> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });
    return this.http.post<Club>(`${this.baseUrl}/add`, club, { headers: headers });
  }*/
  addClub(club: Club, imageFile: File): Observable<Club> {
    const formData = new FormData();
    formData.append('clubName', club.clubName);
    formData.append('description', club.description);
    formData.append('membershipCount', club.membershipCount.toString());
    formData.append('tag', club.tag);
    formData.append('image', imageFile);

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post<Club>(`${this.baseUrl}/add`, formData, { headers: headers });
  }

  updateClub(clubId:number, club:Club ,image:File): Observable<Club> {
    const formData = new FormData();
        formData.append('clubName', club.clubName);
        formData.append('tag', club.tag);
        formData.append('membershipCount', club.membershipCount.toString());
        formData.append('description', club.description);
        formData.append('image', image);

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });
        return this.http.put<Club>(`${this.baseUrl}/updateclub/${clubId}`, formData, { headers: headers });
  }

  getAllClubs(): Observable<Club[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
  });
    return this.http.get<Club[]>(`${this.baseUrl}`,{ headers: headers });
  }

  getClubById(id: number): Observable<Club> {
    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
  });
    return this.http.get<Club>(`${this.baseUrl}/${id}`, { headers: headers });
  }

  deleteClub(id: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: headers });
  }
  getUser(): Observable<UserModel> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<UserModel>(`${this.baseUrl}/getconnecteduser`, { headers: headers });
  }
  getClubByTag(tag: string): Observable<Club[]> {
    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
  });
    return this.http.get<Club[]>(`${this.baseUrl}/getByTag/${tag}`, { headers: headers });
  }

  getClubByName(clubName: string): Observable<Club> {
    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
  });
    return this.http.get<Club>(`${this.baseUrl}/getByName/${clubName}`, { headers: headers });
  }
  

  generatePDF(): Observable<Blob> {
    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
  });
     return this.http.get(`${this.baseUrl}/generate-pdf`, { responseType: 'blob' , headers: headers});
   }
   getClubTagStatistics(): Observable<Map<string, number>> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<Map<string, number>>(`${this.baseUrl}/tag-statistics`, { headers: headers });
  }
}

export { Club };
