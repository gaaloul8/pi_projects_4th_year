import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Club } from '../interfaces/club';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private baseUrl = 'http://localhost:8081/clubs';
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYWRva0Blc3ByaXQudG4iLCJpYXQiOjE3MTQyMjE4NjgsImV4cCI6MTcxNDMwODI2OH0.xOZBqJt88F2WFkfqPeFJr7Q59PpKwfnk3Ounsy0J9vQ';

  constructor(private http: HttpClient) { }

  /*addClub(club: Club): Observable<Club> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });
    return this.http.post<Club>(`${this.baseUrl}/add`, club, { headers: headers });
  }*/
  addClub(club: Club, imageFile: File): Observable<any> {
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
   getClubTagStatistics(): Observable<Map<string, number>> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<Map<string, number>>(`${this.baseUrl}/tag-statistics`, { headers: headers });
  }
}

export { Club };
