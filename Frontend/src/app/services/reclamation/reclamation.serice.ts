import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Reclamation, ReclamationStatus} from '../../models/reclamation.model';

@Injectable({
    providedIn: 'root'
})
export class ReclamationService {

    private baseUrl = 'http://localhost:8080/api/reclamations';

    constructor(private http: HttpClient) { }

    getReclamations(): Observable<Reclamation[]> {
        return this.http.get<Reclamation[]>(this.baseUrl);
    }

    getReclamationById(id: number): Observable<Reclamation> {
        return this.http.get<Reclamation>(`${this.baseUrl}/${id}`);
    }

    createReclamation(reclamation: Reclamation): Observable<Object> {
        return this.http.post(this.baseUrl, reclamation);
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





}
