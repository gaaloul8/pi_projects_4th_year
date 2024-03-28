import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RewardService {

    private apiUrl = 'http://localhost:8081/reward';

    constructor(private http: HttpClient) { }

    getAllRewards(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/getallrewards`);
    }
    getRewardById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/findrewardbyid/${id}`);
    }

    addReward(name: string, description: string, cost: number, nbDispo: number, User: any): Observable<any> {
        const rewardData = { name, description, cost, nbDispo, User };
        return this.http.post<any>(`${this.apiUrl}/addreward`, rewardData);
    }

    deleteReward(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/deletereward/${id}`);
    }

    updateReward(id: number, name: string, description: string, cost: number, nbDispo: number, User: any): Observable<any> {
        const rewardData = { id, name, description, cost, nbDispo, User };
        return this.http.put<any>(`${this.apiUrl}/updatereward`, rewardData);
    }

    purchaseReward(id: number): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/buyreward/${id}`, null);
    }

    getStatistics(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/statstics`);
    }

    getRewardsWithDiscount(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/withdisoucnt`);
    }

    getRewardsWithoutDiscount(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/withnodisoucnt`);
    }
}
