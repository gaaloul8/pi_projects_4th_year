import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {


    private baseUrl = 'http://localhost:8081/activity';

    constructor(private http: HttpClient) { }

    getAllActivities(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/all`);
    }

    addActivity(activity: any, id: number): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/${id}/activity`, activity);
    }

    updateActivity(activity: any): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/update`, activity);
    }

    getActivityById(id: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/getActivity/${id}`);
    }

    deleteActivity(activity: any): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/delete`, { body: activity });
    }

    getAllActivitiesByQuizId(id: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/allByQuiz/${id}`);
    }

    deleteActivityAndImg(activity: any): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/deleteactivity`, { body: activity });
    }

    uploadImage(file: File, id: number, activityJson: string): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('multipartFile', file, file.name);
        formData.append('activityJson', activityJson);
        return this.http.post<any>(`${this.baseUrl}/upload/${id}`, formData);
    }

}
