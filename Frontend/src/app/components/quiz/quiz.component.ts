import {Component,ViewChild, OnInit} from '@angular/core';
import { QuizService } from '../../services/quiz/quiz.service';
import {FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {RatingModule} from "primeng/rating";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";
import {Router, RouterLink} from "@angular/router";
import {CalendarModule} from "primeng/calendar";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FileUploadModule} from "primeng/fileupload";
import {RadioButtonModule} from "primeng/radiobutton";
import {ToastModule} from "primeng/toast";
import {TooltipModule} from "primeng/tooltip";
@Component({
  selector: 'app-quiz',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, ButtonModule, InputTextModule, RatingModule, RippleModule, SharedModule, TableModule, ToolbarModule, RouterLink, CalendarModule, DialogModule, DropdownModule, InputNumberModule, InputTextareaModule, FileUploadModule, RadioButtonModule, ToastModule, TooltipModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {

    quizzes: any[] = [];
    selectedQuiz: any = {};
    isNewQuiz: boolean = true;
    quiForm: FormGroup;
    selectedQuizId: number | undefined;

    @ViewChild('addForm') addForm!: NgForm;
    @ViewChild('updateForm') updateForm!: NgForm;

    constructor(private quizService: QuizService, private formBuilder: FormBuilder,private router: Router) {
    }

    addQuizDialog: boolean = false;
    newQuiz: any = {};

    showAddQuizDialog() {
        this.addQuizDialog = true;
    }

    hideAddQuizDialog() {
        this.addQuizDialog = false;
    }

    ngOnInit(): void {
        this.loadQuizzes();
        this.quiForm = this.formBuilder.group({
            idQuiz: [''],
            description: [''],
            title: [''],
            type: [''],
            publication: [''],


        });
    }

    loadQuizzes(): void {
        this.quizService.getAllQuizzes().subscribe(
            (quizzes: any[]) => {
                this.quizzes = quizzes;
                console.log(quizzes);

            },
            (error) => {
                console.error('Une erreur s\'est produite lors du chargement des quizzes : ', error);
                if (error.status === 403) {
                    console.log(error);
                    this.router.navigate(['/auth/access']);
                }
            }
        );

    }


    /* selectQuiz(quiz: any): void {
         this.selectedQuiz = { ...quiz };
         this.isNewQuiz = false;
     }*/

    selectQuiz(quiz: any): void {
        this.selectedQuiz = quiz;

        this.isNewQuiz = false;
        this.selectedQuizId = this.selectedQuiz.idQuiz;
        console.log(this.selectedQuizId)


    }

    addNewQuiz(): void {
        this.selectedQuiz = {};
        this.isNewQuiz = true;
    }


    saveQuiz(): void {

        if (this.addForm.valid || this.updateForm.valid) {
            const quizData = this.addForm.value;
            //quizData.quizOwner={id_user: 2}
            if (this.isNewQuiz) {
                this.quizService.addQuiz(quizData).subscribe(
                    (response) => {
                        console.log('Quiz ajouté avec succès : ', response);
                        this.loadQuizzes(); // Recharger la liste des quizzes après l'ajout
                    },
                    (error) => {
                        console.error('Une erreur s\'est produite lors de l\'ajout du quiz : ', error);
                    }
                );
            } else {
                const quizData = this.updateForm.value;
                console.log(this.updateForm.value)
                // Si ce n'est pas un nouveau quiz, mettez à jour les valeurs du formulaire
                this.quizService.updateQuiz(quizData).subscribe(
                    (response) => {
                        console.log('Quiz mis à jour avec succès : ', response);
                        this.loadQuizzes(); // Recharger la liste des quizzes après la mise à jour
                    },
                    (error) => {
                        console.error('Une erreur s\'est produite lors de la mise à jour du quiz : ', error);
                    }
                );
            }
        } else {
            console.error('Le formulaire n\'est pas valide');
        }
    }


    deleteQuiz(): void {
        if (this.selectedQuiz) {
           if (confirm('Are you sure you want to delete this quiz?')) {
                this.quizService.deleteQuiz(this.selectedQuiz).subscribe(
                    (response) => {
                        console.log('Quiz supprimé avec succès : ', response);
                        this.loadQuizzes(); // Recharger la liste des quizzes après la suppression

                    },
                    (error) => {
                        console.error('Une erreur s\'est produite lors de la suppression du quiz : ', error);
                    }
                );
          }
        } else {
            console.error('Aucun quiz sélectionné pour la suppression');
        }
    }


    public onOpenModal(quiz, mode: String): void {
        const container = document.getElementById('main-container')
        const buttom = document.createElement('button');
        buttom.type = 'button';
        buttom.style.display = 'none';
        buttom.setAttribute('data-bs-toggle', 'modal');
        if (mode === 'add') {
            buttom.setAttribute('data-bs-toggle', '#addQuizModal');
        }
        if (mode === 'update') {
            buttom.setAttribute('data-bs-toggle', '#updateQuizModal');
        }
        if (mode === 'delete') {
            buttom.setAttribute('data-bs-toggle', '#deleteQuizModal');
        }
        container.appendChild(buttom);
        buttom.click();
    }



    notifyMe(texte:string) {
        // Vérifions si le navigateur prend en charge les notifications
        if (!("Notification" in window)) {
            alert("Ce navigateur ne prend pas en charge la notification de bureau");
        }

        // Vérifions si les autorisations de notification ont déjà été accordées
        else if (Notification.permission === "granted") {
            // Si tout va bien, créons une notification
            const notification = new Notification(texte);
        }

        // Sinon, nous devons demander la permission à l'utilisateur
        else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
                // Si l'utilisateur accepte, créons une notification
                if (permission === "granted") {
                    const notification = new Notification(texte);
                }
            });
        }


    }
    publishQuiz(quiz: any) {
        this.selectedQuiz = quiz;
        if (this.selectedQuiz.publication==false) {
            this.quizService.publishQuiz(this.selectedQuiz).subscribe(
                (response) => {
                    console.log('Quiz publié avec succès : ', response);
                    this.notifyMe("🚀 Quiz published successfully!");
                    this.loadQuizzes();
                },
                (error) => {
                    console.error('Une erreur s\'est produite lors de la mise à jour  du quiz : ', error);
                }
            );
        }
        else {
            this.quizService.unpublishQuiz(this.selectedQuiz).subscribe(
                (response) => {
                    console.log('Quiz n est plus publié r avec succès : ', response);
                    this.notifyMe("🔒 Quiz unpublished successfully!");
                    this.loadQuizzes();
                },
                (error) => {
                    console.error('Une erreur s\'est produite lors de la mise à jour  du quiz : ', error);
                }
            );
        }
    }
    searchTerm: string = '';
    filteredQuiz: any[];
    filterQuiz() {
        if (this.searchTerm.trim() === '') {
            // Si le terme de recherche est vide, afficher toutes les questions
            this.filteredQuiz = this.quizzes;
        } else {

            // Sinon, filtrer les questions en fonction du terme de recherche
            this.filteredQuiz = this.quizzes.filter(question =>
                question.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                question.type.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            question.description.toLowerCase().includes(this.searchTerm.toLowerCase())

            );
            console.log(this.filteredQuiz);
        }
    }


}
