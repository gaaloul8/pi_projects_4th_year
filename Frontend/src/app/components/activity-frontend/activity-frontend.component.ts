import {Component, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ActivitiesService} from "../../services/activities/activities.service";
import {FormsModule} from "@angular/forms";
import {CommonModule, NgForOf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {ProgressBarModule} from "primeng/progressbar";
import {BadgeModule} from "primeng/badge";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RippleModule} from "primeng/ripple";

@Component({
  selector: 'app-activity-frontend',
  standalone: true,
  imports: [

      NgForOf,
      CommonModule,
      ButtonModule,
      DialogModule,
      InputTextModule,
      InputTextareaModule,
      RippleModule,
      RouterLink,
  ],
  templateUrl: './activity-frontend.component.html',
  styleUrls: ['./activity-frontend.component.scss','../forum/forum.component.scss','../../../assets/scss/core.scss']
})
export class ActivityFrontendComponent implements OnInit{
    activities: any[] = [];

    quizId:number;



    constructor(private route: ActivatedRoute,private activityService :ActivitiesService,private renderer: Renderer2) { }
    ngOnInit(): void {
        // Récupérer l'identifiant du quiz à partir de la route
        this.route.params.subscribe(params => {
            this.quizId = +params['idQuiz'];
            console.log(this.quizId);
            this.loadActivities(this.quizId);
        });
        setTimeout(() => {
            this.loadJsFiles();

        }, 1);

    }

    loadActivities(quizId: number): void {
        this.activityService.getAllActivitiesByQuizId(quizId).subscribe(
            (activities: any[]) => {
                this.activities = activities;
                console.log(activities);
            },
            (error) => {
                console.error('Une erreur s\'est produite lors du chargement des activités : ', error);
            }
        );
    }

    public loadJsFile(url: string) {
        const body = <HTMLDivElement>document.body;
        const script = document.createElement('script');
        script.innerHTML = '';
        script.src = url;
        script.async = false;
        script.defer = true;
        script.className = "custom-js";
        script.onerror = (error) => {
            console.error('Failed to load script:', error);
        };
        this.renderer.appendChild(document.body, script);
    }

    loadJsFiles(): void {
        this.loadJsFile("../../../../assets/js/common.js");
        this.loadJsFile("../../../../assets/js/global.js");
        this.loadJsFile("../../../../assets/js/main.js");
    }

    selectedActivity: any; // Activité sélectionnée pour afficher les détails

    openModal(activity: any) {
        this.selectedActivity = activity;
        document.body.classList.add('modal-open'); // Ajoute une classe pour empêcher le défilement de la page en arrière-plan
    }

    closeModal() {
        this.selectedActivity = null;
        document.body.classList.remove('modal-open'); // Retire la classe ajoutée pour permettre le défilement
    }
    isImage(url: string): boolean {
        // Vérifie si l'URL se termine par une extension d'image courante
        return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    }

    isVideo(url: string): boolean {
        // Vérifie si l'URL se termine par une extension vidéo courante
        return url.match(/\.(mp4|avi|mov|flv)$/) != null;
    }


}
