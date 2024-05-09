import {Component, ViewChild} from '@angular/core';
import {Reclamation} from "../../../models/reclamation.model";
import {ReclamationService} from "../../../services/reclamation/reclamation.serice";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {CustomNotificationComponent} from "../custom-notification/custom-notification.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-archived-reclamations',
  standalone: true,
    imports: [
        NgIf,
        NgForOf,
        CustomNotificationComponent,
        DatePipe,
        MatButtonModule,
        MatIconModule
    ],
  templateUrl: './archived-reclamations.component.html',
  styleUrl: './archived-reclamations.component.scss'
})
export class ArchivedReclamationsComponent {
    archivedReclamations: Reclamation[] = [];
    @ViewChild(CustomNotificationComponent) customNotification!: CustomNotificationComponent;

    constructor(private reclamationService: ReclamationService) { }

    ngOnInit(): void {
        this.fetchArchivedReclamations();
    }

    fetchArchivedReclamations(): void {
        this.reclamationService.getArchivedReclamations().subscribe({
            next: (reclamations) => this.archivedReclamations = reclamations,
            error: (err) => console.error(err)
        });
    }

    deleteReclamation(reclamationId: number): void {
        if(confirm('Are you sure you want to delete this reclamation?')) {
            this.reclamationService.deleteReclamation(reclamationId).subscribe({
                next: () => {
                    this.archivedReclamations = this.archivedReclamations.filter(reclamation => reclamation.reclamationId !== reclamationId);
                    this.customNotification.display('Reclamation deleted successfully');
                },
                error: () => {
                    this.customNotification.display('Error deleting reclamation');
                }
            });
        }
    }

}
