import { Component } from '@angular/core';
import {ReclamationService} from "../../services/reclamation/reclamation.serice";
import {Reclamation} from "../../models/reclamation.model";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-my-reclamations',
  standalone: true,
    imports: [
        NgIf,
        NgForOf,
        NgClass,
        FormsModule
    ],
  templateUrl: './my-reclamations.component.html',
  styleUrl: './my-reclamations.component.scss'
})
export class MyReclamationsComponent {

    userReclamations: Reclamation[] = [];
    userId = 1; // Assuming a logged-in user with ID 1

    filteredReclamations: Reclamation[] = [];
    searchQuery: string = '';

    constructor(private reclamationService: ReclamationService) {}

    ngOnInit(): void {
        this.loadUserReclamations(this.userId);
    }

    loadUserReclamations(userId: number): void {
        this.reclamationService.getReclamationsByUserId(userId).subscribe({
            next: (data) => {
                this.userReclamations = data;
                this.filteredReclamations = data;
            },
            error: (e) => console.error(e)
        });
    }



    getStatusClass(status: string): string {
        switch(status) {
            case 'SUBMITTED':
                return 'status-submitted';
            case 'IN_PROGRESS':
                return 'status-in-progress';
            case 'RESOLVED':
                return 'status-resolved';
            default:
                return '';
        }
    }

    archiveReclamation(reclamationId: number): void {
        this.reclamationService.archiveReclamation(reclamationId).subscribe({
            next: () => {
                this.loadUserReclamations(this.userId); // Reload the list to reflect the change
                alert('Reclamation archived successfully'); // Notify the user
            },
            error: (e) => console.error('Error archiving reclamation', e)
        });
    }

    filterReclamations(query: string): void {
        this.searchQuery = query;
        if (!query) {
            this.filteredReclamations = this.userReclamations;
        } else {
            this.filteredReclamations = this.userReclamations.filter(
                reclamation => reclamation.title.toLowerCase().includes(query.toLowerCase())
            );
        }
    }



}
