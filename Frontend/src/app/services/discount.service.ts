import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import {Discount} from "../interfaces/discount";
import {Forum} from "./forum.service";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DiscountService {
    private baseUrl = environment.backendUrl;

   // private apiUrl = 'http://localhost:8081/discount';
    private token =  localStorage.getItem('jwtAccessToken');

    constructor(private http: HttpClient) { }

    getAllDiscounts(): Observable<Discount[]> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });
        return this.http.get<Discount[]>(`${this.baseUrl}/discount/getalldiscounts`, { headers: headers });
    }

    getDiscountById(id: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/discount/getDiscountbyid/${id}`);
    }

    addDiscount(discount: Discount): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<Discount>(`${this.baseUrl}/discount/addDiscount`, {
            createdDiscount: discount.createdDiscount,
            endDiscount: discount.endDiscount,
            discountValue: discount.discountValue,
            rewardId: discount.rewardId
        }, httpOptions,);
    }

    deleteDiscount(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/discount/deleteDiscount/${id}`);
    }

    calculateNewCost(discount: Discount): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/discount/calculnewcost`, {
            idDiscount: discount.idDiscount,
            createdDiscount: discount.createdDiscount,
            endDiscount: discount.endDiscount,
            discountValue: discount.discountValue,
            reward: { idReward: discount.rewardId }  // Adjusted to match the backend format
        });}
    searchDiscountByDate(date: Date): Observable<any[]> {
        // Formater la date en format ISO 8601 pour correspondre au format attendu par Spring
        const isoDate = date.toISOString();

        // Appeler l'endpoint Spring avec la date en tant que paramètre de requête
        return this.http.get<any[]>(`${this.baseUrl}/discount/searchByDate/${isoDate}`)
    }

    updateDiscount(id:number,discount: Discount): Observable<Discount> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        });
        return this.http.put<Discount>(`${this.baseUrl}/update/${id}`, discount, { headers: headers });
    }

}



