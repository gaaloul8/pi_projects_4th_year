import {Component, OnInit} from '@angular/core';
import {WebcamImage, WebcamInitError, WebcamModule, WebcamUtil} from "ngx-webcam";
import {NgIf} from "@angular/common";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-takeimage',
  standalone: true,
    imports: [
        WebcamModule,
        NgIf
    ],
  templateUrl: './takeimage.component.html',
  styleUrl: './takeimage.component.scss'
})
export class TakeimageComponent {
    selectedFile: File;
    recognizedText: any;
    errorMessage:String;

    constructor(private http: HttpClient,
                private router: Router
    ) { }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
    }

    uploadImage() {
        if (!this.selectedFile) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('carte', this.selectedFile);
        const token = localStorage.getItem('jwtAccessToken');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });

        this.http.post<any>('http://localhost:8081/profile/upload', formData, {headers: headers})
            .subscribe(
                response => {
                    if (response === true) {
                        this.router.navigate(['/login']); // Navigate to the login component after successful registration
                    } else {
                        this.errorMessage = "Please input the right identifier.";
                    }
                },
                error => {
                    console.error('Error occurred:', error);
                    this.router.navigate(['/notfound']); // Navigate to the login component after successful registration
                }
            );

        // handleResponse(response: boolean) {
        //     if (!response) {
        //         localStorage.removeItem('jwtAccessToken');
        //         console.log('Access restricted. JWT token removed from local storage.');
        //     }


    }}
