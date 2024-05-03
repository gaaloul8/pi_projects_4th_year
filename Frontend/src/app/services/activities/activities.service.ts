import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {


    private baseUrl = 'http://localhost:8081/activity';
    private token =  localStorage.getItem('jwtAccessToken');
    constructor(private http: HttpClient) { }
  /*  createHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        });
    }*/
    getAllActivities(): Observable<any[]> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        });
        return this.http.get<any[]>(`${this.baseUrl}/all`,{ headers: headers });
    }

    addActivity(activity: any, id: number): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        });
        return this.http.post<any>(`${this.baseUrl}/${id}/activity`, activity,{ headers: headers });
    }

    updateActivity(activity: any): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        });
        return this.http.put<any>(`${this.baseUrl}/update`, activity,{ headers: headers });
    }

    getActivityById(id: number): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        });
        return this.http.get<any>(`${this.baseUrl}/getActivity/${id}`,{ headers: headers });
    }

    deleteActivity(activity: any): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        });
        return this.http.delete<any>(`${this.baseUrl}/delete`, { body: activity , headers: headers });
    }

    getAllActivitiesByQuizId(id: number): Observable<any[]> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        });
        return this.http.get<any[]>(`${this.baseUrl}/allByQuiz/${id}`,{ headers: headers });
    }

    deleteActivityAndImg(activity: any): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        });
        return this.http.delete<any>(`${this.baseUrl}/deleteactivity`, { body: activity , headers: headers  });
    }

    uploadImage(file: File, id: number, activityJson: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        });
        const formData: FormData = new FormData();
        formData.append('multipartFile', file, file.name);
        formData.append('activityJson', activityJson);
        return this.http.post<any>(`${this.baseUrl}/upload/${id}`, formData,{ headers: headers });
    }

}
