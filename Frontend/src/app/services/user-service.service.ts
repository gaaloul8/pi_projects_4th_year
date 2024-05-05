import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../models/userModel";
import {UserUpdateRequest} from "../models/UserUpdateRequest";

@Injectable({
  providedIn: 'root'
})


export class UserServiceService {

    private baseUrl = 'http://localhost:8081'
  constructor( private http: HttpClient) { }

    getTotalUsers() {
        const token = localStorage.getItem('jwtAccessToken');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });
        return this.http.get<number>(`${this.baseUrl}/profile/totalUsers`,{ headers: headers });
    }

    getUsersByLevel() {
        const token = localStorage.getItem('jwtAccessToken');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });
        return this.http.get<any>(`${this.baseUrl}/profile/usersByLevel`,{ headers: headers });
    }
    getClubs() {
        const token = localStorage.getItem('jwtAccessToken');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });
        return this.http.get<any>(`${this.baseUrl}/profile/totalClubs`,{ headers: headers });
    }

    completeProfile(formData: FormData) {
        const token = localStorage.getItem('jwtAccessToken');
        console.log(token)
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });

        return this.http.post(`${this.baseUrl}/profile/complete`, formData, { headers: headers });
    }
    public getAllUsers(): Observable<UserModel[]> {
        const token = localStorage.getItem('jwtAccessToken');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });
        return this.http.get<UserModel[]>(`${this.baseUrl}/getUsers`, { headers: headers });}
    public deleteUser(id_user: number): Observable<void> {
        const token = localStorage.getItem('jwtAccessToken');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });
        return this.http.delete<void>(`${this.baseUrl}/deleteuser/${id_user}`, { headers: headers });
    }

    PromoteUser(user: UserModel): Observable<any> {
        const token = localStorage.getItem('jwtAccessToken');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });
        return this.http.put(`${this.baseUrl}/profile/update`, user, { headers: headers });
    }



    GetUser(): Observable<UserModel> {
        const token = localStorage.getItem('jwtAccessToken');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });
        return this.http.get(`${this.baseUrl}/profile/currUser`, { headers: headers });
    }


    updateUser(formData: FormData): Observable<UserModel> {
        const token = localStorage.getItem('jwtAccessToken');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });
        return this.http.put<UserModel>(`${this.baseUrl}/profile/my`, formData, { headers: headers });
    }
}
