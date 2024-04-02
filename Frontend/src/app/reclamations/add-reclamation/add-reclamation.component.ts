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

    constructor(private fb: FormBuilder, private reclamationService: ReclamationService) {
        this.reclamationForm = this.fb.group({
            createdBy: this.fb.group({
                id: [1, Validators.required], // Assuming a logged-in user with ID 1
            }),
            title: ['', Validators.required],
            description: ['', Validators.required],
            status: ['IN_PROGRESS'],
            createdAt: [new Date()],
        });
    }

    onSubmit(): void {
        if (this.reclamationForm.valid) {
            this.reclamationService.createReclamation(this.reclamationForm.value).subscribe({
                next: (resp) => {
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

