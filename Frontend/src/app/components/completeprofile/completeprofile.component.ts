import { Component } from '@angular/core';
import {RegisterRequest} from "../../models/registerRequest";
import {CompleteProfile} from "../../models/Complete-profile";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {UserServiceService} from "../../services/user-service.service";
import {Tag} from "primeng/tag";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {LoginRequest} from "../../models/loginRequest";

@Component({
  selector: 'app-completeprofile',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        NgIf,
        ButtonModule,
        NgForOf
    ],
  templateUrl: './completeprofile.component.html',
  styleUrl: './completeprofile.component.scss'
})
export class CompleteprofileComponent {


    completeProfile :  CompleteProfile={};

    submitted = false;

    constructor(
        private userService: UserServiceService,
        private router: Router,
        private formBuilder: FormBuilder

    )
    {

    }
    imageUrl: string;

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        this.completeProfile.profilePicture = file;

        // Preview the image
        const reader = new FileReader();
        reader.onload = () => {
            this.imageUrl = reader.result as string;
        };
        reader.readAsDataURL(file);
    }
    updateTags(event: any) {
        const tag: string = event.target.value;
        if (event.target.checked) {
            // Add the tag to the tags string if checkbox is checked
            if (this.completeProfile.tags) {
                this.completeProfile.tags += ',' + tag;
            } else {
                this.completeProfile.tags = tag;
            }
        } else {
            // Remove the tag from the tags string if checkbox is unchecked
            const tagsArray = this.completeProfile.tags.split(',');
            const index = tagsArray.indexOf(tag);
            if (index !== -1) {
                tagsArray.splice(index, 1);
                this.completeProfile.tags = tagsArray.join(',');
            }
        }
    }
    CompleteProfiles () {
        const formData = new FormData();
        formData.append('tags', this.completeProfile.tags);
        formData.append('profilePicture', this.completeProfile.profilePicture);
        formData.append('niveau', this.completeProfile.niveau);
        formData.append('Identifiant',this.completeProfile.Identifiant)
//console.log(JSON.stringify(this.completeProfile.tags))
      //  console.log(this.completeProfile.tags);
       // console.log(this.completeProfile.profilePicture);


        this.userService.completeProfile(formData).subscribe(
            response => {
                this.router.navigate(['/takeimage']); // Navigate to the login component after successful registration

                console.log('Profile updated successfully:', response);
            },
            error => {
                this.router.navigate(['/']); // Navigate to the login component after successful registration

                console.error('Error updating profile:', error);
            }
        );

    }


}
