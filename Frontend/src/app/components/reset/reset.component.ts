import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {RegisterRequest} from "../../models/registerRequest";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-reset',
  standalone: true,
    imports: [
        FormsModule,
        NgIf
    ],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss'
})
export class ResetComponent implements  OnInit{
    resetToken: string;
    password: string;
    Message: string ="";
    resetErrorMessage: string;
    newPasswordRequiredMessage: string;


    constructor( private authService: AuthService,private route: ActivatedRoute,private router: Router) { }

    ngOnInit(): void {
        this.resetToken = this.route.snapshot.paramMap.get('resetToken');

    }
    resetPassword() {

        const resetRequest = { password: this.password };
        this.authService.resetPassword(resetRequest, this.resetToken).subscribe(

            response => {
                this.Message="Your password has been Reset"
                this.router.navigate(['/login']);

            },
            error => {
                this.Message="An error occured reseting your password"

            }
        );
    }


}
