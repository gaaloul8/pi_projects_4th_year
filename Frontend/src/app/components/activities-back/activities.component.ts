import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, NgForm} from "@angular/forms";
import {CommonModule, NgForOf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RippleModule} from "primeng/ripple";
import {ActivatedRoute} from "@angular/router";
import {ActivitiesService} from "../../services/activities/activities.service";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FileUploadModule} from "primeng/fileupload";
import {InputNumberModule} from "primeng/inputnumber";
import {RadioButtonModule} from "primeng/radiobutton";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";


@Component({
  selector: 'app-activities',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        ButtonModule,
        InputTextModule,
        InputTextareaModule,
        RippleModule,
        DialogModule,
        DropdownModule,
        FileUploadModule,
        InputNumberModule,
        RadioButtonModule,
        TableModule,
        ToastModule,
        ToolbarModule,
        MatFormField,
        MatIcon,
        CommonModule

    ],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent implements OnInit{
    activities: any[] = [];
    selectedActivity: any = {};
    isNewActivity: boolean = true;
    quiForm: FormGroup;
    quizId:number;
    selectedFile: File | null = null;
    previewImageUrl: string | null = null;
    image: File | null = null;
    imageMin: File | null = null;

    @ViewChild('addForm') addForm!: NgForm;
    @ViewChild('updateForm') updateForm!: NgForm;
    constructor(private route: ActivatedRoute,private activityService :ActivitiesService, private formBuilder: FormBuilder,) { }


    ngOnInit(): void {
        // Récupérer l'identifiant du quiz à partir de la route
        this.route.params.subscribe(params => {
            this.quizId = +params['idQuiz'];
            console.log(this.quizId);
            this.loadActivities(this.quizId);
        });

        // Initialiser le formulaire
        this.quiForm = this.formBuilder.group({
            content: [''],


        });
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
    selectActivity(activity: any): void {
        this.selectedActivity = activity;
        this.isNewActivity= false;
    }
    saveActivity(): void {

        if (this.addForm.valid || this.updateForm.valid) {
            const activityData = this.addForm.value;
            if (this.isNewActivity) {
                this.activityService.addActivity(activityData,this.quizId).subscribe(
                    (response) => {
                        console.log('Acitivité ajouté avec succès : ', response);
                        this.loadActivities(this.quizId) // Recharger la liste des quizzes après l'ajout
                    },
                    (error) => {
                        console.error('Une erreur s\'est produite lors de l\'ajout de l\'activité : ', error);
                    }
                );
            }
            else {
                const activityData = this.updateForm.value;
                console.log(this.updateForm.value)
                // Si ce n'est pas un nouveau quiz, mettez à jour les valeurs du formulaire
                this.activityService.updateActivity(activityData).subscribe(
                    (response) => {
                        console.log('Activité  mis à jour avec succès : ', response);
                        this.loadActivities(this.quizId) // Recharger la liste des quizzes après la mise à jour
                    },
                    (error) => {
                        console.error('Une erreur s\'est produite lors de la mise à jour de activité : ', error);
                    }
                );
            }}
        else {
            console.error('Le formulaire n\'est pas valide');
        }
    }
    deleteActivity(): void {
        if (this.selectedActivity) {
           //if (confirm('Voulez-vous vraiment supprimer cette activité ?')) {
                this.activityService.deleteActivityAndImg(this.selectedActivity).subscribe(
                    (response) => {
                        console.log('Activité supprimée avec succès : ', response);
                        // Charger la liste des activités après la suppression réussie
                        this.loadActivities(this.quizId);
                    },
                    (error) => {
                        console.error('Une erreur s\'est produite lors de la suppression de l\'activité : ', error);
                    }
                );
          //  }
        } else {
            console.error('Aucune activité sélectionnée pour la suppression');
        }
    }




    onUpload(): void {
        if (this.selectedActivity) {
           const activityData = this.addForm.value;
            const activityJson = JSON.stringify(activityData);
            this.activityService.uploadImage(this.image,this.quizId,activityJson).subscribe(
                data => {
                    this.fetchImages();
                },
                err => {
                    this.reset();
                    this.fetchImages();
                }
            );
        }
    }

    reset(): void {
        this.image = null;
        this.imageMin = null;
        const imageInputFile = document.getElementById('image') as HTMLInputElement;
        if (imageInputFile) {
            imageInputFile.value = '';
        }
    }

    fetchImages(): void {
        this.activityService.getAllActivitiesByQuizId(this.quizId).subscribe(
            (activities) => {
                this.activities = activities;
            },
            (error) => {
                console.error('Error fetching images:', error);
            }
        );
    }
    onFileChange(event: any) {
        this.image = event.target.files[0];
        this.imageMin = null;
        const fr = new FileReader();
        fr.onload = (evento: any) => {
            this.imageMin = evento.target.result;
        };
        if (this.image) {
            fr.readAsDataURL(this.image);
        }
    }
    isImage(url: string): boolean {

        if (url && (url.toLowerCase().endsWith('.png') || url.toLowerCase().endsWith('.jpg') || url.toLowerCase().endsWith('.jpeg') || url.toLowerCase().endsWith('.gif'))) {
            return true;
        } else {
            return false;
        }
    }



}
