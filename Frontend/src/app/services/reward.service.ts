import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RewardService {
    private baseUrl = 'http://localhost:8081/reward'; // Base URL of your Spring backend

    constructor(private http: HttpClient) { }

    getAllRewards(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/getallrewards`);
    }

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
            nbDispo: reward.nbDispo
        }, httpOptions);
    }

    updateReward(id: number, reward: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.put(`${this.baseUrl}/updatereward/${id}`, {
            name: reward.name,
            description: reward.description,
            cost: reward.cost,
            nbDispo: reward.nbDispo
        }, httpOptions);
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
        const url = `${this.baseUrl}/deletreward/${Rewardid}`;
        return this.http.delete<void>(url)
    }



}
export interface Reward {
    idReward?: number;
    name?: string;
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
