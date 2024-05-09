import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {User} from "../../models/user.model";
import {ReclamationService} from "../../services/reclamation/reclamation.serice";
import {ActivatedRoute, Router} from "@angular/router";
import {Reclamation} from "../../models/reclamation.model";

@Component({
  selector: 'app-reclamation-assign',
  standalone: true,
    imports: [
        FormsModule,
        NgIf,
        NgForOf,
        DatePipe
    ],
  templateUrl: './reclamation-assign.component.html',
  styleUrl: './reclamation-assign.component.scss'
})
export class ReclamationAssignComponent {
    managers: User[] = [];
    selectedManagerId: number | null = null;
    reclamation: Reclamation | null = null;

    constructor(
        private reclamationService: ReclamationService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.fetchManagers();
        this.route.params.subscribe(params => {
            const reclamationId = params['id'];
            this.loadReclamation(reclamationId);
        });
    }

    fetchManagers() {
        this.reclamationService.getAllManagers().subscribe((data) => {
            this.managers = data;
        });
    }

    assignManager() {
        if (this.selectedManagerId) {
            const reclamationId = this.route.snapshot.params['id'];
            this.reclamationService.assignReclamationToManager(reclamationId, this.selectedManagerId)
                .subscribe(() => {
                    this.router.navigate(['/reclamation']);
                });
        }
    }

    loadReclamation(reclamationId: number): void {
        this.reclamationService.getReclamationById(reclamationId).subscribe(
            (data: Reclamation) => {
                this.reclamation = data;
            },
            error => {
                console.error('Error fetching reclamation', error);
            }
        );
    }

}
