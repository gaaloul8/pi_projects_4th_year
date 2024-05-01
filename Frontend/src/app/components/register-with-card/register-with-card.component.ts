import {Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {WebcamImage, WebcamInitError, WebcamModule} from "ngx-webcam";
import {CropperPosition, ImageCroppedEvent} from "ngx-image-cropper";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {AsyncPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-with-card',
  standalone: true,
    imports: [
        WebcamModule,
        NgIf,
        AsyncPipe,
        NgOptimizedImage
    ],
  templateUrl: './register-with-card.component.html',
  styleUrl: './register-with-card.component.scss'
})
export class RegisterWithCardComponent {
    private trigger: Subject<void> = new Subject<void>();
    public webcamImage!: WebcamImage;
    private nextWebcam: Subject<void> = new Subject<void>();
    sysImage = '';
    croppedImage: string | undefined;
    passwordHint: string;


    ngOnInit() {}
    constructor(private http: HttpClient,
                private router: Router
    ) { }

    public getSnapshot(): void {
        this.trigger.next();
    }

    public captureImg(webcamImage: WebcamImage): void {
        this.webcamImage = webcamImage;
        this.sysImage = webcamImage!.imageAsDataUrl;
        console.info('got webcam image', this.sysImage);

        const overlayX = 120;
        const overlayY = 100; // Adjust according to your overlay box position
        const overlayWidth = 450; // Adjust according to your overlay box width
        const overlayHeight = 300; // Adjust according to your overlay box height

        const cropX = overlayX;
        const cropY = overlayY;
        const cropWidth = overlayWidth;
        const cropHeight = overlayHeight;


        const image = new Image();
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            // Set canvas dimensions to target dimensions
            canvas.width = 2015;
            canvas.height = 1745;

            // Resize and draw the image onto the canvas
            context.drawImage(
                image,
                cropX, cropY, cropWidth, cropHeight, // Source rectangle (cropping)
                0, 0, canvas.width, canvas.height // Destination rectangle (resizing)
            );

            // Enhance text visibility

            // Get resized and enhanced image as a data URL
            this.croppedImage = canvas.toDataURL('image/jpeg');
        };
        image.src = webcamImage.imageAsDataUrl;
        const formData = new FormData();
        formData.append('capturedImage', this.dataURItoBlob(this.croppedImage!), 'image.jpg'); // Convert data URI to blob

        const token = localStorage.getItem('jwtAccessToken');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });
        this.http.post<any>('http://localhost:8081/profile/compare-faces', formData, {headers: headers})
            .subscribe(
                response => {
                    if (response) {
                        if (response.message) {
                            // Faces match, retrieve password hint
                            this.passwordHint = response.message;
                            console.log('Password Hint:', this.passwordHint);
                        } else if (response.values) {
                            // Faces don't match, extract lock time and account locked status
                            const valuesString = response.values;
                            const [lockTimeString, isAccountNonLockedString] = valuesString.split('|');
                            const dateTimePart = lockTimeString.substring(0, lockTimeString.lastIndexOf('false') - 1);
                            const lockTime = new Date(dateTimePart);
                            const isAccountNonLocked = isAccountNonLockedString === 'true';

                            console.log('Lock Time:', lockTime);
                            console.log('Is Account Non Locked:', isAccountNonLocked);

                            // Store lock time in localStorage
                            localStorage.setItem('LockTime', dateTimePart);
                            localStorage.setItem('isAccountNonLocked', String(isAccountNonLocked));

                            // Redirect based on account locked status
                            if (isAccountNonLocked === false) {
                                console.log('Account is locked');
                                this.router.navigate(['/accountLocked']);
                            } else {
                                console.log('Account is not locked');
                                this.router.navigate(['/welcome']);
                            }
                        } else {
                            console.error('Invalid response format');
                            this.router.navigate(['/notfound']);
                        }
                    } else {
                        console.error('Empty response');
                        this.router.navigate(['/notfound']);
                    }
                },
                error => {
                    console.error('Error occurred:', error);
                    this.router.navigate(['/notfound']); // Navigate to the login component after successful registration
                }
            );
    }

    private dataURItoBlob(dataURI: string): Blob {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }

    public get invokeObservable(): Observable<void> {
        return this.trigger.asObservable();
    }

    public get nextWebcamObservable(): Observable<void> {
        return this.nextWebcam.asObservable();
    }

}


