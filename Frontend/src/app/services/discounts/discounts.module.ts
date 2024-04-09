import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DiscountService {
    private apiUrl = 'http://localhost:8081/discount';

    constructor(private http: HttpClient) { }

    getAllDiscounts(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/getalldiscounts`);
    }

    getDiscountById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/getDiscountbyid/${id}`);
    }

    addDiscount(discount: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<any>(`${this.apiUrl}/addDiscount`, {
            createdDiscount: discount.createdDiscount,
            endDiscount: discount.endDiscount,
            discountValue: discount.discountValue,
            reward: discount.reward
        }, httpOptions);
    }

    deleteDiscount(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/deleteDiscount/${id}`);
    }

    calculateNewCost(discountId: number, updatedDiscount: any): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/calculnewcost/${discountId}`, updatedDiscount);
    }
}
