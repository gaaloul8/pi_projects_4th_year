import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registercard2',
  standalone: true,
  imports: [],
  templateUrl: './registercard2.component.html',
  styleUrl: './registercard2.component.scss'
})
export class Registercard2Component {
    selectedFile: File;
    recognizedText: any;

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


        this.http.post<any>('http://localhost:8081/auth/carte', formData, )
            .subscribe(
                response => {

                    console.log('Text recognized:', response);
                    this.router.navigate(['/login']); // Navigate to the login component after successful registration


                },
                error => {
                    console.error('Error occurred:', error);
                    this.router.navigate(['/notfound']); // Navigate to the login component after successful registration

                }
            );
    }



}
