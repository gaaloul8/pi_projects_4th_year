import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Transaction_history} from "../interfaces/Transaction_history";

@Injectable({
    providedIn: 'root'
})
export class RewardService {
    private baseUrl = 'http://localhost:8081/reward'; // Base URL of your Spring backend
    private token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYWRvay5zYXNzaUBlc3ByaXQudG4iLCJpYXQiOjE3MTM5NDgxMDUsImV4cCI6MTcxNDAzNDUwNX0.P8R44rfSXGTGd9485NMS_3zmiSVhEfeYOzT2yyMFcn0'
    constructor(private http: HttpClient) { }

    getAllRewards(): Observable<Reward[]> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });
        return this.http.get<Reward[]>(`${this.baseUrl}/getallrewards`,{ headers: headers });}



    getRewardById(id: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/findrewardbyid/${id}`);
    }

    findrewardbyname(name: String): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/findrewardbyname/${name}`);
    }


    addReward(reward:Reward ,image:File): Observable<any> {
            const formData = new FormData();
            formData.append('name', reward.name);
            formData.append('image', image);
            formData.append('cost',  reward.cost.toString() );
            formData.append('description', reward.description);
        formData.append('nbDispo',  reward.nbDispo.toString() );

        const headers = new HttpHeaders({
                'Authorization': 'Bearer ' + this.token
            });
            return this.http.post<Reward>(`${this.baseUrl}/addreward`, formData, { headers: headers });
        }


    updatereward(reward: Reward): Observable<Reward> {
        return this.http.put<Reward>(`${this.baseUrl}/updatereward`, reward);
    }

    deleteRewardd(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/deletereward/${id}`);
    }



    purchaseReward(id: number): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}/buyreward/${id}`, null);
    }

    getStatistics(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/statstics`);
    }

    getRewardsWithDiscount(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/withdiscount`);
    }

    getRewardsWithoutDiscount(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/withnodiscount`);
    }

    deleteReward(Rewardid: number): Observable<void> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });
        return this.http.delete<void>(`${this.baseUrl}/deletreward/${Rewardid}`, {headers: headers});

    }

    getalltransactions():Observable<Transaction_history[]>{
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });
        return this.http.get<Transaction_history[]>(`${this.baseUrl}/getalltransactions`,{ headers: headers });}



    getMonthlyTransactionCounts(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/monthly-count`);
    }





}





export interface Reward {
    idReward?: number;
    name?: string;
    image?:string;
    User?: User;
    cost?: number;
    description?: string;
    nbDispo?: number;
}
export interface User {
    id_user?: number;
    firstName?: string;
    lastName?: string;
    password?: string;
    resetToken?: string;
    email?: string;
    role?: string;
}
