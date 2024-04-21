import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ReclamationService} from "../../services/reclamation/reclamation.serice";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {NgIf} from "@angular/common";
@Component({
  selector: 'app-add-reclamation',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        NgIf
    ],
  templateUrl: './add-reclamation.component.html',
  styleUrl: './add-reclamation.component.scss'
})
export class AddReclamationComponent {
    reclamationForm: FormGroup;
    imageToUpload: File | null = null;
    imageUrl: string | ArrayBuffer | null = null;


    constructor(private fb: FormBuilder, private reclamationService: ReclamationService) {
        this.reclamationForm = this.fb.group({
            createdBy: this.fb.group({
                id: [1, Validators.required], // Assuming a logged-in user with ID 1
            }),
            title: ['', Validators.required],
            description: ['', Validators.required],
            createdAt: [new Date()],
        });
    }

    private previewImage(file: File): void {
        const reader = new FileReader();
        reader.onload = () => {
            this.imageUrl = reader.result;
        };
        reader.readAsDataURL(file);
    }

    onFileSelected(event: Event): void {
        const element = event.currentTarget as HTMLInputElement;
        let fileList: FileList | null = element.files;
        if (fileList) {
            this.imageToUpload = fileList[0];
            this.previewImage(this.imageToUpload); // Call the previewImage method
        }
    }


    onSubmit(): void {
        if (this.reclamationForm.valid && this.imageToUpload) {
            const formData = new FormData();
            formData.append('reclamation', JSON.stringify(this.reclamationForm.value));
            formData.append('image', this.imageToUpload);

            this.reclamationService.createReclamation(this.reclamationForm.value, this.imageToUpload).subscribe({                next: (resp) => {
                    // Handle response
                    console.log('Reclamation added', resp);
                    // Optionally reset form or give user feedback
                    this.reclamationForm.reset();
                },
                error: (error) => {
                    // Handle error
                    console.error('Error adding reclamation', error);
                }
            });
        }
    }
}

