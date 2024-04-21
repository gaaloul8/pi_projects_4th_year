import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Reclamation, ReclamationStatus} from '../../models/reclamation.model';
import {User} from "../../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class ReclamationService {

    private baseUrl = 'http://localhost:8081/api/reclamations';

    constructor(private http: HttpClient) { }

    getReclamations(): Observable<Reclamation[]> {
        return this.http.get<Reclamation[]>(this.baseUrl);
    }

    getReclamationById(id: number): Observable<Reclamation> {
        return this.http.get<Reclamation>(`${this.baseUrl}/${id}`);
    }



    createReclamation(reclamation: Reclamation, image: File): Observable<Reclamation> {
        const formData = new FormData();
        formData.append('reclamation', new Blob([JSON.stringify(reclamation)], {
            type: 'application/json'
        }));
        formData.append('image', image);

        return this.http.post<Reclamation>(this.baseUrl, formData);
    }

    updateReclamation(id: number, reclamation: Reclamation): Observable<Object> {
        return this.http.put(`${this.baseUrl}/${id}`, reclamation);
    }

    deleteReclamation(id: number): Observable<Object> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    archiveReclamation(reclamationId: number): Observable<any> {
        return this.http.patch(`${this.baseUrl}/${reclamationId}/archive`, null);
    }
    getArchivedReclamations(): Observable<Reclamation[]> {
        return this.http.get<Reclamation[]>(`${this.baseUrl}/archived`);
    }

    updateReclamationStatus(reclamationId: number, newStatus: ReclamationStatus): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(`${this.baseUrl}/${reclamationId}/status`, `"${newStatus}"`, { headers });
    }

    getOldestReclamations(): Observable<Reclamation[]> {
        return this.http.get<Reclamation[]>(`${this.baseUrl}/oldest`);
    }

    getNewestReclamations(): Observable<Reclamation[]> {
        return this.http.get<Reclamation[]>(`${this.baseUrl}/newest`);
    }

    searchReclamationsByTitle(title: string): Observable<Reclamation[]> {
        return this.http.get<Reclamation[]>(`${this.baseUrl}/search`, { params: { title } });
    }

    getReclamationsByUserId(userId: number): Observable<Reclamation[]> {
        return this.http.get<Reclamation[]>(`${this.baseUrl}/user/${userId}`);
    }

    getReclamationsStatistics(): Observable<any> {
        return this.http.get(`${this.baseUrl}/statistics`);
    }

    getAllManagers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}/managers`);
    }

    assignReclamationToManager(reclamationId: number, managerId: number): Observable<Reclamation> {
        return this.http.post<Reclamation>(`${this.baseUrl}/${reclamationId}/assign-manager/${managerId}`, null);
    }


    getReclamationsAssignedToUser(userId: number): Observable<Reclamation[]> {
        return this.http.get<Reclamation[]>(`${this.baseUrl}/assigned-to/${userId}`);
    }
    resolveReclamation(reclamationId: number): Observable<Reclamation> {
        return this.http.post<Reclamation>(`${this.baseUrl}/${reclamationId}/resolve`, {});
    }

    inProgressReclamation(reclamationId: number): Observable<any> {
        return this.http.post(`${this.baseUrl}/${reclamationId}/progress`, {});
    }

    getWeeklyReclamationsCount(): Observable<number> {
        return this.http.get<number>(`${this.baseUrl}/weekly-count`);
    }








}
