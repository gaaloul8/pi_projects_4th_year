import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Reclamation, ReclamationStatus} from '../../models/reclamation.model';
import {UserModel} from "../../models/userModel";

@Injectable({
    providedIn: 'root'
})
export class ReclamationService {

    private baseUrl = 'http://localhost:8081/api/reclamations';
    private token =  localStorage.getItem('jwtAccessToken');


    constructor(private http: HttpClient) { }

    getReclamations(): Observable<Reclamation[]> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
          });
        return this.http.get<Reclamation[]>(this.baseUrl,{headers:headers});
    }

    getReclamationById(id: number): Observable<Reclamation> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
          });
        return this.http.get<Reclamation>(`${this.baseUrl}/${id}`,{headers:headers});
    }



    createReclamation(reclamation: Reclamation, image: File): Observable<Reclamation> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
          });
        const formData = new FormData();
        formData.append('reclamation', new Blob([JSON.stringify(reclamation)], {
            type: 'application/json'
        }));
        formData.append('image', image);

        return this.http.post<Reclamation>(this.baseUrl, formData , {headers:headers});
    }

    updateReclamation(id: number, reclamation: Reclamation): Observable<Object> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
          });
        return this.http.put(`${this.baseUrl}/${id}`, reclamation,{headers:headers});
    }

    deleteReclamation(id: number): Observable<Object> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
          });
        return this.http.delete(`${this.baseUrl}/${id}`,{headers:headers});
    }

    archiveReclamation(reclamationId: number): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
          });
        return this.http.patch(`${this.baseUrl}/${reclamationId}/archive`, null,{headers:headers});
    }
    getArchivedReclamations(): Observable<Reclamation[]> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
          });
        return this.http.get<Reclamation[]>(`${this.baseUrl}/archived`,{headers:headers});
    }

    updateReclamationStatus(reclamationId: number, newStatus: ReclamationStatus): Observable<Reclamation> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
          });
        return this.http.post<Reclamation>(`${this.baseUrl}/${reclamationId}/status`, `"${newStatus}"`, { headers:headers });
    }

    getOldestReclamations(): Observable<Reclamation[]> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
          });
        return this.http.get<Reclamation[]>(`${this.baseUrl}/oldest`,{headers:headers});
    }

    getNewestReclamations(): Observable<Reclamation[]> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
          });
        return this.http.get<Reclamation[]>(`${this.baseUrl}/newest`,{headers:headers});
    }

    searchReclamationsByTitle(title: string): Observable<Reclamation[]> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
          });
        return this.http.get<Reclamation[]>(`${this.baseUrl}/search`, { params: { title } ,headers:headers});
    }

    getReclamationsByUserId(userId: number): Observable<Reclamation[]> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
          });
        return this.http.get<Reclamation[]>(`${this.baseUrl}/user/${userId}`,{headers:headers});
    }

    getReclamationsStatistics(): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
          });
        return this.http.get(`${this.baseUrl}/statistics`,{headers:headers});
    }

    getAllManagers(): Observable<UserModel[]> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
          });
        return this.http.get<UserModel[]>(`${this.baseUrl}/managers`,{headers:headers});
    }

    assignReclamationToManager(reclamationId: number, managerId: number): Observable<Reclamation> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
          });
        return this.http.post<Reclamation>(`${this.baseUrl}/${reclamationId}/assign-manager/${managerId}`, null,{headers:headers});
    }


    getReclamationsAssignedToUser(userId: number): Observable<Reclamation[]> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
          });
        return this.http.get<Reclamation[]>(`${this.baseUrl}/assigned-to/${userId}`,{headers:headers});
    }
    getCurrentUser(): Observable<UserModel> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
          });
        return this.http.get<UserModel>(`${this.baseUrl}/getconnecteduser`,{headers:headers});
    }
    resolveReclamation(reclamationId: number): Observable<Reclamation> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
          });
        return this.http.post<Reclamation>(`${this.baseUrl}/${reclamationId}/resolve`, null,{headers: headers});
    }

    inProgressReclamation(reclamationId: number): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
          });
        return this.http.post(`${this.baseUrl}/${reclamationId}/progress`,null, {headers:headers});
    }

    getWeeklyReclamationsCount(): Observable<number> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
          });
        return this.http.get<number>(`${this.baseUrl}/weekly-count`,{headers:headers});
    }








}
