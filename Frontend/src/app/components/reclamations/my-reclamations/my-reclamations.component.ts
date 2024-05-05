import { Component } from '@angular/core';
import {ReclamationService} from "../../../services/reclamation/reclamation.serice";
import {Reclamation} from "../../../models/reclamation.model";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { UserModel } from 'src/app/models/userModel';
import { Router } from '@angular/router';

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
    userId :number; 

    filteredReclamations: Reclamation[] = [];
    searchQuery: string = '';

    constructor(private reclamationService: ReclamationService,private router:Router) {}

    ngOnInit(): void {
        this.loadUserReclamations();
    }
    addReclamation(){
        this.router.navigate(['main/reclamation/add']);
    }
    loadUserReclamations(): void {
        this.reclamationService.getCurrentUser()
            .subscribe((user: UserModel) => {
                this.userId = user.id_user;
        this.reclamationService.getReclamationsByUserId(user.id_user).subscribe({
            next: (data) => {
                console.log(data);
                this.userReclamations = data;
                this.filteredReclamations = data;   
            },
            error: (e) => console.error(e)
        });
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
                this.loadUserReclamations(); // Reload the list to reflect the change
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
