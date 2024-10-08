import {Component, OnInit, Renderer2,AfterViewInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, NgForm} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {QuizService} from "../../services/quiz/quiz.service";
import {QuestionQuizService} from "../../services/question-quiz/question-quiz.service";

import { CommonModule } from '@angular/common';
import {QuizUserService} from "../../services/quiz-user/quiz-user.service";
import {ProgressBarModule} from "primeng/progressbar";
import {BadgeModule} from "primeng/badge";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RippleModule} from "primeng/ripple";
import {RouterLink} from "@angular/router";
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-quiz-frontend',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        PaginatorModule,

        CommonModule,
        ProgressBarModule,
        BadgeModule,
        ProgressSpinnerModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        InputTextareaModule,
        RippleModule,
        RouterLink,
        // Assurez-vous que CommonModule est importé ici

    ],
  templateUrl: './quiz-frontend.component.html',

    styleUrls: ['./quiz-frontend.component.scss','../forum/forum.component.scss','../../../assets/scss/core.scss'
    ],
})
export class QuizFrontendComponent implements OnInit{
    quizzes: any[] = [];
    questions: any[] = [];
    selectedQuiz: any = {};
    isNewQuiz: boolean = true;
    quiForm: FormGroup;
    selectedQuizId: number | undefined;
    currentQuestionIndex = 0;
    // selectedOptions: { [questionId: number]: { [optionId: number]: boolean } } = {};
    selectedOptions: { [questionId: number]: number } = {};
    selectedOptionContent: { [questionId: number]: string } = {};
    loading = true;
    loading1 = true;
    showModal: boolean = false;
    participation: any;


    quizUser: any = {
        score: 12,
        description: "description_value",
        reponses: ["response1", "response2", "response3"],
    };


    @ViewChild('addForm') addForm!: NgForm;
    @ViewChild('updateForm') updateForm!: NgForm;
    public showQuizModal: boolean;
    showResultMessage = false;

     participationStates: boolean[];


    constructor(private quizService: QuizService, private formBuilder: FormBuilder, private questionQuizService: QuestionQuizService, private quizUserService: QuizUserService, private renderer: Renderer2,private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.loadQuizzes();

        this.quiForm = this.formBuilder.group({
            idQuiz: [''],
            description: [''],
            title: [''],
            type: ['']

        });

        setTimeout(() => {
            this.loadJsFiles();

        }, 100);

    }

    /*ngAfterViewInit(): void {
        setTimeout(() => {
            this.loadJsFiles();

        }, 100);


    }*/


 /*   loadQuizzes(): void {
        this.quizService.getAllQuizzesAllowedToPublish().subscribe(
            (quizzes: any[]) => {
                this.quizzes = quizzes;
                console.log(quizzes);

            },
            (error) => {
                console.error('Une erreur s\'est produite lors du chargement des quizzes : ', error);
            }
        );
    }*/
    loadQuizzes(): void {
        this.quizService.getAllQuizzesAllowedToPublish().subscribe(
            (quizzes: any[]) => {
                const participationPromises = quizzes.map(quiz => this.showLastParticipation1(quiz.idQuiz));

                Promise.all(participationPromises).then((participations: any[]) => {
                    this.quizzes = quizzes;
                    this.participationStates = participations.map(participation => participation !== null);
                }).catch(error => {
                    console.error('Une erreur s\'est produite lors du chargement des participations : ', error);
                });
            },
            (error) => {
                console.error('Une erreur s\'est produite lors du chargement des quizzes : ', error);
            }
        );
    }



    selectQuiz(quiz: any): void {
        this.selectedQuiz = quiz;

        this.isNewQuiz = false;
        this.selectedQuizId = this.selectedQuiz.idQuiz;
        console.log(this.selectedQuizId)
    }

    showLastParticipation1(idQuiz: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.quizUserService.retrieveQuizUserParticipation(idQuiz).subscribe(
                (participation: any) => {
                    console.log(participation);
                    resolve(participation);
                },
                (error) => {
                    console.error('Une erreur s\'est produite lors du chargement de la dernière participation au quiz : ', error);
                    reject(error);
                }
            );
        });
    }
    showLastParticipation(idQuiz): void {
       console.log(idQuiz);
        this.quizUserService.retrieveQuizUserParticipation(idQuiz).subscribe(
            (participation: any) => {
                this.participation = participation;
                console.log(participation);
                this.showModal = true;
            },
            (error) => {
                console.error('Une erreur s\'est produite lors du chargement de la dernière participation au quiz : ', error);
            }
        );
    }

    closeModal(): void {
        this.showModal = false;
    }


    hasParticipation(idQuiz: number): boolean {
        // Vérifier si idQuiz est null
        if (idQuiz === null) {
            return false; // Aucun quiz n'est sélectionné, donc pas de participation
        }

        // Vérifier si une participation existe pour le quiz sélectionné
        const participation = this.showLastParticipation(idQuiz);
        return participation !== null;
    }

    /* startQuiz(quizId: number): void {
         console.log(quizId);
         this.questionQuizService.getQuestionsByQuizId(quizId).subscribe(questions => {
             // Stockez les questions récupérées dans une variable accessible par votre modèle
             this.questions = questions;
             console.log(questions)
             // Vous pouvez faire d'autres traitements ici si nécessaire
         });

     }*/
    updateSelectedOptionContent(questionId: number, optionContent: string): void {
        this.selectedOptionContent[questionId] = optionContent;
        console.log('Option sélectionnée pour la question', questionId, ':', optionContent);
    }

    openQuizModal(quiz): void {
        this.questionQuizService.getQuestionsByQuizId(quiz.idQuiz).subscribe(questions => {
            if (questions.length === 0) {
                // Afficher un message indiquant qu'aucune question n'est disponible pour ce quiz
                console.log("Aucune question n'est disponible pour ce quiz.");
            } else {
                this.questions = questions;
                // Réinitialiser les options sélectionnées pour chaque question
                this.selectedOptions = {};
                this.selectedOptionContent = {};
                for (const question of this.questions) {
                    this.selectedOptions[question.idQuestion] = null;
                    this.selectedOptionContent[question.idQuestion] = null;
                    // Initialiser à null pour chaque question
                }
            }

            // Ouvrir la modal
            // this.modalService.open('quizModal');

        });
    }
    showErrorMessage: boolean = false;

    // Fonction pour afficher l'alerte d'erreur
    displayErrorMessage() {
        this.showErrorMessage = true;
    }

    // Fonction pour fermer l'alerte d'erreur
    dismissErrorMessage() {
        this.showErrorMessage = false;
    }

    nextQuestion(): void {
        const currentQuestionId = this.questions[this.currentQuestionIndex].idQuestion;
        console.log(currentQuestionId);

        if (!this.selectedOptions[currentQuestionId]) {

           // alert("Please select an answer before moving on to the next question.");
            this.displayErrorMessage();
            return;
        }

        if (this.currentQuestionIndex < this.questions.length) {
            this.currentQuestionIndex++;
        }
    }

    /* submitQuiz(): void {
         // Envoyer les réponses sélectionnées à votre service ou faire d'autres traitements nécessaires
         console.log('Réponses sélectionnées : ', this.selectedOptions);
         // Fermer la modal
         //this.modalService.dismissAll();
     }*/
    description: string;


    resetQuiz(): void {
        this.questions = []; // Réinitialiser les questions
        this.selectedOptions = {}; // Réinitialiser les options sélectionnées
        this.currentQuestionIndex = 0; // Réinitialiser l'index de la question actuelle

    }

    convertSelectedOptionsToReponses(): string[] {
        const responses: string[] = [];
        for (const questionId in this.selectedOptionContent) {
            const optionContent = this.selectedOptionContent[questionId];
            if (optionContent !== null) {
                responses.push(optionContent);
            }
        }
        return responses;
    }

    submitQuiz(): void {
        // Convertir les options sélectionnées en réponses

        this.quizUser.reponses = this.convertSelectedOptionsToReponses();


        console.log(this.quizUser);

        /* this.quizUserService.passerQuiz(this.quizUser, this.selectedQuiz.idQuiz).subscribe(() => {
             // Gérer la réponse de la requête si nécessaire
             console.log('Quiz soumis avec succès !');*/
        this.quizUserService.passerQuiz(this.quizUser, this.selectedQuiz.idQuiz).subscribe(response => {
            // Afficher la description récupérée depuis le backend
            console.log(response); // Assurez-vous que response contient la propriété 'description'
            this.description = response.description;

            console.log(this.description);

            setTimeout(() => {

                this.loading1 = false;
                console.log(this.showResultMessage)
                this.showResultMessage = true;
            }, 2500);

            // Réinitialiser les options sélectionnées
            this.selectedOptions = {};
        }, error => {
            // Gérer les erreurs si nécessaire
            console.error('Erreur lors de la soumission du quiz :', error);
        });
    }

    totalQuestions = this.questions.length;

    calculateProgress(): number {
        return Math.ceil((this.currentQuestionIndex / this.questions.length) * 100);
    }

    showQuizLauncher = false;

    startQuiz(): void {
        this.showQuizLauncher = true;
    }

    launchQuizModal(): void {
        // Définissez un délai de 5 secondes (5000 millisecondes)
        this.loading = true;
        this.showQuizLauncher = true;
        this.showQuizModal = false;
        setTimeout(() => {
            // Après 5 secondes, ouvrez le modal du quiz
            console.log(this.selectedQuiz);

            this.showQuizModal = true;
            this.showQuizLauncher = false;

            this.openQuizModal(this.selectedQuiz);
        }, 2000);
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




}


