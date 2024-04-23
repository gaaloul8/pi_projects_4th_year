import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import {Discount} from "../interfaces/discount";

@Injectable({
    providedIn: 'root'
})
export class DiscountService {
    private apiUrl = 'http://localhost:8081/discount';

    constructor(private http: HttpClient) { }

    getAllDiscounts(): Observable<Discount[]> {
        return this.http.get<Discount[]>(`${this.apiUrl}/getalldiscounts`);
    }

    getDiscountById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/getDiscountbyid/${id}`);
    }

    addDiscount(discount: Discount): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<Discount>(`${this.apiUrl}/addDiscount`, {
            createdDiscount: discount.createdDiscount,
            endDiscount: discount.endDiscount,
            discountValue: discount.discountValue,
            rewardId: discount.rewardId
        }, httpOptions);
    }

    deleteDiscount(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/deleteDiscount/${id}`);
    }

    calculateNewCost(discount: Discount): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/calculnewcost`, {
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
        return this.http.get<any[]>(`${this.apiUrl}/searchByDate/${isoDate}`)
    }


}



