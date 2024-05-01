import { Component } from '@angular/core';
import {RegisterRequest} from "../../models/registerRequest";
import {AuthService} from "../../services/auth.service";
import {AuthResponse} from "../../models/auth-response";
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ChipsModule} from "primeng/chips";
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-register',
    imports: [
        FormsModule,
        RouterLink,
        ChipsModule,
        PasswordModule,
        ButtonModule,
        NgIf
    ],
    templateUrl: './register.component.html',
    standalone: true,
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
    registerRequest :  RegisterRequest={};
    authResponse: AuthResponse = {};
    errorMessage: string;
    formSubmitted: boolean = false;


    constructor(
        private authService: AuthService,
        private router: Router

    )
    {}
    registerUser() {
        this.errorMessage = ''; // Reset error message on each form submission
        this.formSubmitted = true; // Set the formSubmitted flag when the form is submitted

        // Check if any required field is empty, return without submitting if any field is empty
        if (!this.registerRequest.firstName || !this.registerRequest.lastName || !this.registerRequest.email || !this.registerRequest.password) {
            return;
        }

        // Submit the registration request
        this.authService.register(this.registerRequest)
            .subscribe({
                next: (response) => {
                    this.authResponse = response;
                    localStorage.setItem('jwtAccessToken', this.authResponse.jwtaccestoken);
                    this.router.navigate(['/complete']); // Navigate to the login component after successful registration
                },
                error: (error) => {
                    if (error.status === 403) {
                        this.errorMessage = 'Email already used';
                    } else {
                        this.errorMessage = 'An error occurred while registering';
                    }
                }
            });
    }

}
