import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Transaction_history} from "../interfaces/Transaction_history";
import {an} from "@fullcalendar/core/internal-common";

@Injectable({
    providedIn: 'root'
})
export class RewardService {
    private baseUrl = 'http://localhost:8081/reward'; // Base URL of your Spring backend
    private token =  localStorage.getItem('jwtAccessToken');
    constructor(private http: HttpClient) { }

    getAllRewards(): Observable<Reward[]> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });
        return this.http.get<Reward[]>(`${this.baseUrl}/getallrewards`,{ headers: headers });}

    purchaseReward(id: number): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });

        // Pass the headers as the third parameter to the post method
        return this.http.post<any>(`${this.baseUrl}/buyreward/${id}`, null, { headers });
    }

    sendSMS(rewardName: string, cost: number, NbDispo: number): Observable<any> {
        const url = `${this.baseUrl}/sendSMS?rewardName=${rewardName}&cost=${cost}&NbDispo=${NbDispo}`;
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });
        return this.http.get<any>(url);
    }

    getRewardById(id: number): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });
        return this.http.get<any>(`${this.baseUrl}/findrewardbyid/${id}`,{ headers: headers });
    }

    findrewardbyname(name: String): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/findrewardbyname/${name}`);
    }

    getConnectedUser(): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });
        return this.http.get<any>(`${this.baseUrl}/getconnecteduser`,{ headers: headers });
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


    updateReward(rewardId: number, reward: Reward, image: File): Observable<any> {
        const formData = new FormData();
        formData.append('name', reward.name);
        formData.append('image', image);
        formData.append('cost', reward.cost.toString());
        formData.append('description', reward.description);
        formData.append('nbDispo', reward.nbDispo.toString());

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });

        return this.http.put<Reward>(`${this.baseUrl}/updatereward/${rewardId}`, formData, { headers: headers });
    }


    deleteRewardd(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/deletereward/${id}`);
    }





    getStatistics(): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });
        return this.http.get<any>(`${this.baseUrl}/statstics`,{ headers: headers });
    }

    getRewardsWithDiscount(): Observable<any[]> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });

        return this.http.get<any[]>(`${this.baseUrl}/withdiscount`,{ headers: headers });
    }

    getRewardsWithoutDiscount(): Observable<any[]> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });

        return this.http.get<any[]>(`${this.baseUrl}/withnodiscount`,{ headers: headers });
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

    getrewarbyuser():Observable<any>{
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });
        return this.http.get<Reward[]>(`${this.baseUrl}/getrewarbyuser`,{ headers: headers });}


    getMonthlyTransactionCounts(): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });
        return this.http.get<any>(`${this.baseUrl}/monthly-count`,{ headers: headers });
    }
    updateRate(idreward:number,rate:number):Observable<any>{
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });
        return this.http.put<any>(`${this.baseUrl}/updateRate/${idreward}/${rate}`,{ headers: headers });}







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
