import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterRequest} from "../models/registerRequest";
import {LoginRequest} from "../models/loginRequest";
import {AuthResponse} from "../models/auth-response";
import {ForgetRequest} from "../models/ForgetRequest";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private baseUrl = environment.backendUrl;


   // private baseUrl = 'http://localhost:8081/auth'
  constructor(  private http: HttpClient) { }
    register(
        registerRequest: RegisterRequest
    ) {
        return this.http.post<AuthResponse>
        (`${this.baseUrl}/auth/register`, registerRequest);
    }

    login(
        authRequest: LoginRequest
    ) {
        return this.http.post<AuthResponse>
        (`${this.baseUrl}/auth/login`, authRequest);
    }
    forget(
        ForgetRequest: ForgetRequest
    ) {
        return this.http.post<any>
        (`${this.baseUrl}/auth/forget-password`, ForgetRequest);
    }


    resetPassword(resetRequest: any, resetToken: string) {
        return this.http.post<string>(`${this.baseUrl}/auth/reset-password/${resetToken}`, resetRequest);
    }
    logout(): void {
        localStorage.removeItem('jwtAccessToken');
    }

}
