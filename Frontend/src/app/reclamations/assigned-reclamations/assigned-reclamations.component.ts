import { Component } from '@angular/core';
import {Reclamation} from "../../models/reclamation.model";
import {ReclamationService} from "../../services/reclamation/reclamation.serice";
import {ActivatedRoute} from "@angular/router";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-assigned-reclamations',
  standalone: true,
    imports: [
        NgIf,
        NgForOf,
        DatePipe,
        NgClass
    ],
  templateUrl: './assigned-reclamations.component.html',
  styleUrl: './assigned-reclamations.component.scss'
})
export class AssignedReclamationsComponent {

    reclamations: Reclamation[] = [];
    userId: number=3;

    constructor(
        private reclamationService: ReclamationService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        //this.userId = +this.route.snapshot.paramMap.get('userId');
        this.loadReclamations();
    }

    private loadReclamations(): void {
        this.reclamationService.getReclamationsAssignedToUser(this.userId)
            .subscribe((reclamations: Reclamation[]) => {
                this.reclamations = reclamations;
            });
    }
    getStatusClass(status: string): string {
        switch (status) {
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

    toggleReclamationStatus(reclamationId: number, isResolved: boolean): void {
        if (isResolved) {
            this.reclamationService.resolveReclamation(reclamationId).subscribe(
                () => {
                    console.log('Reclamation resolved');
                    this.loadReclamations(); // Reload to update the list
                },
                error => console.error('Error resolving reclamation', error)
            );
        } else {
            this.reclamationService.inProgressReclamation(reclamationId).subscribe(
                () => {
                    console.log('Reclamation set to in progress');
                    this.loadReclamations(); // Reload to update the list
                },
                error => console.error('Error setting reclamation to in progress', error)
            );
        }
    }




}
