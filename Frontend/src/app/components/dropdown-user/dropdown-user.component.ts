import {Component, OnInit} from '@angular/core';
import {UserServiceService} from "../../services/user-service.service";
import {UserModel} from "../../models/userModel";
import {NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dropdown-user',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './dropdown-user.component.html',
  styleUrl: './dropdown-user.component.scss'
})
export class DropdownUserComponent implements OnInit {

    user: UserModel;
    isDropdownOpen = false;

    constructor(private userService: UserServiceService,
             private   authService: AuthService,
                private router: Router,
    ) {}

    ngOnInit(): void {
        this.userService.GetUser().subscribe(
            (user: UserModel) => {
                this.user = user;
                console.log(this.user.firstName);
            },
            (error) => {
                console.error('Error fetching user profile:', error);
            }
        );
    }

    toggleDropdown(): void {
        this.isDropdownOpen = !this.isDropdownOpen;
    }
    navigateToProfileUpdate(): void {
        this.router.navigate(['/main/profile/update']);
    }
    logout(): void {
        this.authService.logout();
        this.router.navigate(['login']);
    }

}
