import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Club } from '../interfaces/club';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private baseUrl = 'http://localhost:8081/clubs';
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYWRva0Blc3ByaXQudG4iLCJpYXQiOjE3MTM3MTI3MjksImV4cCI6MTcxMzc5OTEyOX0.6Swtj-z6GG6Dvt6NPi8eEeJxk6wZy2CE4dJqnYYEWNQ';

  constructor(private http: HttpClient) { }

  addClub(club: Club): Observable<Club> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });
    return this.http.post<Club>(`${this.baseUrl}/add`, club, { headers: headers });
  }

  updateClub(club: Club): Observable<Club> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });
    return this.http.put<Club>(`${this.baseUrl}/update`, club, { headers: headers });
  }

  getAllClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(`${this.baseUrl}`);
  }

  getClubById(id: number): Observable<Club> {
    return this.http.get<Club>(`${this.baseUrl}/${id}`);
  }

  deleteClub(id: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: headers });
  }

  getClubByTag(tag: string): Observable<Club[]> {
    return this.http.get<Club[]>(`${this.baseUrl}/getByTag/${tag}`);
  }

  getClubByName(clubName: string): Observable<Club> {
    return this.http.get<Club>(`${this.baseUrl}/getByName/${clubName}`);
  }

  generatePDF(): Observable<Blob> {
     return this.http.get(`${this.baseUrl}/generate-pdf`, { responseType: 'blob' });
   }
}

export { Club };
