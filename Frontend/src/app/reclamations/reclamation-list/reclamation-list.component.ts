import {Component, ViewChild} from '@angular/core';
import { Reclamation, ReclamationStatus } from '../../models/reclamation.model';
import { ReclamationService } from '../../services/reclamation/reclamation.serice';
import {DatePipe, NgClass, NgForOf} from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {CustomNotificationComponent} from "../custom-notification/custom-notification.component";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-reclamation-list',
  standalone: true,
    imports: [
        DatePipe,
        NgForOf,
        MatTableModule,
        NgClass,
        MatIconModule,
        MatButtonModule,
        CustomNotificationComponent,
        MatInputModule,
        MatSelectModule,
        FormsModule
    ],
  templateUrl: './reclamation-list.component.html',
  styleUrl: './reclamation-list.component.scss'
})
export class ReclamationListComponent {
    reclamations: Reclamation[] = [];
    @ViewChild('customNotification') customNotification!: CustomNotificationComponent;
    reclamationStatuses = Object.values(ReclamationStatus);

    constructor(private reclamationService: ReclamationService) { }

    ngOnInit(): void {
        this.loadReclamations();
    }


    loadReclamations(): void {
        this.reclamationService.getReclamations().subscribe({
            next: (data) => {
                this.reclamations = data;
            },
            error: (e) => console.error(e)
        });
    }
    archiveReclamation(reclamationId: number): void {
        this.reclamationService.archiveReclamation(reclamationId).subscribe({
            next: (resp) => {
                this.customNotification.display('Reclamation was archived');
                this.loadReclamations();
            },
            error: (err) => {
                this.customNotification.display('Failed to archive reclamation');
            }
        });
    }

    updateReclamationStatus(reclamationId: number, newStatus: ReclamationStatus): void {
        console.log(`Updating status for reclamation ID ${reclamationId} to ${newStatus}`); // Debugging log
        this.reclamationService.updateReclamationStatus(reclamationId, newStatus).subscribe({
            next: (updatedReclamation) => {
                console.log('Reclamation status updated', updatedReclamation);
                this.customNotification.display('Reclamation status updated');
                this.loadReclamations(); // Reload data or better to update locally to avoid extra request
            },
            error: (error) => {
                console.error('Failed to update reclamation status', error);
                this.customNotification.display('Failed to update reclamation status');
            }
        });
    }

}
