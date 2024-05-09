import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {LoginRequest} from "../../models/loginRequest";
import {ForgetRequest} from "../../models/ForgetRequest";
import {FormsModule} from "@angular/forms";
import {ChipsModule} from "primeng/chips";
import {ButtonModule} from "primeng/button";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-forget',
  standalone: true,
    imports: [
        FormsModule,
        ChipsModule,
        ButtonModule,
        NgIf,
        NgClass
    ],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.scss'
})
export class ForgetComponent {


    forgetRequest: ForgetRequest = {};
    Message: string ="";
    formSubmitted: boolean = false;



    constructor(private authService: AuthService
    ) {
    }

    forgetPassword() {
        this.Message = ''; // Reset message on each form submission
        this.formSubmitted = true; // Set the formSubmitted flag when the form is submitted

        // Check if the email field is empty
        if (!this.forgetRequest.email) {
            return; // Do nothing if the email field is empty
        }

        // Submit the forget password request
        this.authService.forget(this.forgetRequest)
            .subscribe(
                response => {
                    this.Message = "Reset Url has been sent to your email";
                },
                error => {
                    if (error.status === 403) {
                        this.Message = 'Invalid email';
                    } else {
                        this.Message = 'An error occurred';
                    }
                }
            );
    }
}
