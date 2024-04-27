import {Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {WebcamImage, WebcamInitError, WebcamModule} from "ngx-webcam";
import {CropperPosition, ImageCroppedEvent} from "ngx-image-cropper";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {AsyncPipe, NgIf, NgOptimizedImage} from "@angular/common";

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

    ngOnInit() {}

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
            this.enhanceTextVisibility(canvas, context);

            // Get resized and enhanced image as a data URL
            this.croppedImage = canvas.toDataURL('image/jpeg');
        };
        image.src = webcamImage.imageAsDataUrl;
    }

    private enhanceTextVisibility(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void {
        // Apply contrast enhancement
        context.filter = 'contrast(150%)';

        // Apply sharpening
        context.drawImage(canvas, 0, 0);
        context.filter = 'contrast(100%) brightness(100%) saturate(100%) drop-shadow(0px 0px 2px #000)';
        context.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);

        // Adjust brightness and contrast
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
            // Increase contrast
            imageData.data[i] = this.adjustContrast(imageData.data[i], 1.5);
            imageData.data[i + 1] = this.adjustContrast(imageData.data[i + 1], 1.5);
            imageData.data[i + 2] = this.adjustContrast(imageData.data[i + 2], 1.5);
        }
        context.putImageData(imageData, 0, 0);
    }

    private adjustContrast(value: number, factor: number): number {
        return Math.max(0, Math.min(255, (value - 128) * factor + 128));
    }

    public get invokeObservable(): Observable<void> {
        return this.trigger.asObservable();
    }

    public get nextWebcamObservable(): Observable<void> {
        return this.nextWebcam.asObservable();
    }

}


