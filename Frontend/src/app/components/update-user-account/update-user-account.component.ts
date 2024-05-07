import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../models/userModel";
import {UserServiceService} from "../../services/user-service.service";
import {FormBuilder, FormGroup, FormsModule, Validators} from "@angular/forms";
import {UserUpdateRequest} from "../../models/UserUpdateRequest";
import {NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";


@Component({
  selector: 'app-update-user-account',
  standalone: true,
    imports: [
        FormsModule,
        NgOptimizedImage
    ],
  templateUrl: './update-user-account.component.html',
  styleUrl: './update-user-account.component.scss'
})
export class UpdateUserAccountComponent {
    user: UserModel = {};
    updateData: UserUpdateRequest = {
        firstName: '',
        lastName: '',
        password: '',
        profilePicture:null
    };
    constructor(private userService: UserServiceService, private router: Router) {


    }

    onSubmit(): void {
        const formData = new FormData();
        formData.append('firstName', this.updateData.firstName);
        formData.append('lastName', this.updateData.lastName);
        formData.append('password', this.updateData.password);
        if (this.updateData.profilePicture) {
            formData.append('profilePicture', this.updateData.profilePicture, this.updateData.profilePicture.name);
        }

        this.userService.updateUser(formData).subscribe(updatedUser => {
            this.router.navigate(['/main/home'])
            console.log('User updated:', updatedUser);
        });
    }

    onFileSelected(event: any): void {
        const file: File = event.target.files[0];
        if (file) {
            this.updateData.profilePicture = file;
        }
    }


}
