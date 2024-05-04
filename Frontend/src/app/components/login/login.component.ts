import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {RegisterRequest} from "../../models/registerRequest";
import {LoginRequest} from "../../models/loginRequest";
import {FormsModule, NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {AuthResponse} from "../../models/auth-response";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {NgxCaptchaModule, ReCaptchaV3Service} from "ngx-captcha";
import {
    RECAPTCHA_SETTINGS,
    RECAPTCHA_V3_SITE_KEY,
    RecaptchaModule,
    RecaptchaSettings,
    RecaptchaV3Module
} from "ng-recaptcha";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        PasswordModule,
        FormsModule,
        RouterLink,
        NgIf,
        RecaptchaModule


    ],
    providers: [
        {
            provide: RECAPTCHA_SETTINGS,
            useValue: {
                siteKey: '6LfKcsMpAAAAAA2N4W4gXDyauBzbqCn-HQVL9aFb',
            } as RecaptchaSettings,
        },

    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements  OnInit {
    loginRequest :  LoginRequest={};
    authResponse: AuthResponse = {};
    errorMessage: string;
    formSubmitted: boolean = false;
    trackLoginAttempts: number=0;
    remainingTime: number;
    public captchaResolved : boolean = false;






    constructor(        private authService: AuthService,
                        private router: Router,
) {

    }

    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

    loginFormSubmit() {
        this.errorMessage = ''; // Reset error message on each form submission
        this.formSubmitted = true; // Set the formSubmitted flag when the form is submitted

        // Check if CAPTCHA is resolved


        // Check if email or password is empty
        if (!this.loginRequest.email || !this.loginRequest.password) {
            // Display error message or handle empty fields
            this.errorMessage = 'Email and password are required';
            return; // Return without submitting the form
        }
        const storedTime = localStorage.getItem('LockTime');
        const lockedDate = new Date(storedTime);
        const currentDate = new Date();
        console.log(currentDate);
        console.log(lockedDate);

        if(currentDate>lockedDate){
            console.log("haha")

            localStorage.setItem('isAccountNonLocked', String(true));

        }

        const isAccountNonLocked = localStorage.getItem('isAccountNonLocked');
        console.log(isAccountNonLocked);
        if (isAccountNonLocked === 'false') {
            console.log(isAccountNonLocked);
            this.errorMessage = 'Your account is locked. Please contact support for assistance.';
            return; // Return without submitting the form
        }
        // Proceed with login request
        this.authService.login(this.loginRequest)
            .subscribe({
                next: (response) => {
                    this.authResponse = response;
                    localStorage.setItem('jwtAccessToken', this.authResponse.jwtaccestoken);
                        console.log(this.authResponse.userLocked);
                    console.log(this.authResponse.role);

                    if (this.authResponse.role === 'Admin' || this.authResponse.role=== 'ClubManager') {

                        this.router.navigate(['/users']);

                    } else {
                        this.router.navigate(['/main/home']);
                    }



                },
                error: (error) => {
                    if (error.status === 403) {
                        this.trackLoginAttempts++;
                        if(this.trackLoginAttempts>=3){
                            console.log(this.trackLoginAttempts)
                            this.router.navigate(['/registerWithcard']);


                        }
                        this.errorMessage = 'Invalid email or password';
                    } else {
                        localStorage.removeItem('jwtAccessToken');
                        this.errorMessage = 'An error occurred while logging in';
                    }
                }
            });
    }
    checkCaptcha(captchaResponse : string) {
        this.captchaResolved = (captchaResponse && captchaResponse.length > 0)
    }


}
