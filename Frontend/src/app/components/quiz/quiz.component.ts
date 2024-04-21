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
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-quiz',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, ButtonModule, InputTextModule, RatingModule, RippleModule, SharedModule, TableModule, ToolbarModule, RouterLink],
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

    constructor(private quizService: QuizService, private formBuilder: FormBuilder,) { }

    ngOnInit(): void {
        this.loadQuizzes();
        this.quiForm = this.formBuilder.group({
            idQuiz:[''],
            description: [''],
            title: [''],
            type: ['']
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
        }
            else {
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
            }}
            else {
            console.error('Le formulaire n\'est pas valide');
        }
    }





    deleteQuiz(): void {
        if (this.selectedQuiz) {
            if (confirm('Voulez-vous vraiment supprimer ce quiz ?')) {
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



    public  onOpenModal(quiz,mode :String):void{
        const container=document.getElementById('main-container')
        const buttom= document.createElement('button');
         buttom.type='button';
         buttom.style.display='none';
         buttom.setAttribute('data-bs-toggle','modal');
         if(mode ==='add'){
             buttom.setAttribute('data-bs-toggle','#addQuizModal');
         }
        if(mode ==='update'){
            buttom.setAttribute('data-bs-toggle','#updateQuizModal');
        }
        if(mode ==='delete'){
            buttom.setAttribute('data-bs-toggle','#deleteQuizModal');
        }
        container.appendChild(buttom);
        buttom.click();
    }
}
