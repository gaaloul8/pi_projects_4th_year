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
    private token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYWRvay5zYXNzaUBlc3ByaXQudG4iLCJpYXQiOjE3MTM2OTk2NDEsImV4cCI6MTcxMzc4NjA0MX0.MI582kUnXRIJAfQAtvhm4IS2WRHff6Na7KMLP3-WP8A'

    constructor(private http: HttpClient) { }

    getAllRewards(): Observable<Reward[]> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });
        return this.http.get<Reward[]>(`${this.baseUrl}/getallrewards`,{ headers: headers });}



    getRewardById(id: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/findrewardbyid/${id}`);
    }

    addReward(reward: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post(`${this.baseUrl}/addreward`, {
            name: reward.name,
            description: reward.description,
            cost: reward.cost,
            nbDispo: reward.nbDispo,
            image:reward.image
        }, httpOptions);
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
