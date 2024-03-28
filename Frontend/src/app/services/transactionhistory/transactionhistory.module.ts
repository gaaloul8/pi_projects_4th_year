import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})


export class TransactionhistoryModule {
    private apiUrl = 'http://localhost:8081/reward';
    constructor(private http: HttpClient) { }

    getAlltransacrion(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/getalltransactions`);
}

}
