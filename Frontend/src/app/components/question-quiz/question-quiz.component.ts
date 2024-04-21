import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, NgForm} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {QuestionQuizService} from "../../services/question-quiz/question-quiz.service";


    interface QuizOption {
    idOption: number;
    content: string;
    correct: boolean;
}


@Component({
  selector: 'app-question-quiz',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        PaginatorModule,
        RouterLink
    ],
  templateUrl: './question-quiz.component.html',
  styleUrl: './question-quiz.component.scss'
})
export class QuestionQuizComponent implements OnInit{
    questions: any[] = [];
    selectedQuestion: any = {};
    isNewQuestion: boolean = true;
    quiForm: FormGroup;
    quizId:number;

    options: QuizOption[]

    @ViewChild('addForm') addForm!: NgForm;
    @ViewChild('updateForm') updateForm!: NgForm;
    constructor(private route: ActivatedRoute,private questionQuizService :QuestionQuizService, private formBuilder: FormBuilder,) { }


    ngOnInit(): void {
        // Récupérer l'identifiant du quiz à partir de la route
        this.route.params.subscribe(params => {
            this.quizId = +params['idQuiz'];
            console.log(this.quizId);
            this.loadQuestions(this.quizId);
        });

        // Initialiser le formulaire
        this.quiForm = this.formBuilder.group({
            content: [''],
            options:['']

        });
    }

    loadQuestions(quizId: number): void {
        this.questionQuizService.getQuestionsByQuizId(quizId).subscribe(
            (questions: any[]) => {
                this.questions = questions;
                console.log(questions);
            },
            (error) => {
                console.error('Une erreur s\'est produite lors du chargement des questions : ', error);
            }
        );
    }


    /* selectQuiz(quiz: any): void {
         this.selectedQuiz = { ...quiz };
         this.isNewQuiz = false;
     }*/

    selectQuiz(question: any): void {
        this.selectedQuestion = question;
        this.isNewQuestion = false;
    }

    /*addNewQuiz(): void {
        this.selectedQuiz = {};
        this.isNewQuiz = true;
    }*/

    addOption(): void {
        if (!this.options) {
            this.options = []; // Initialiser options avec un tableau vide s'il est undefined
        }
        const newOption: QuizOption = {
            idOption: this.options.length + 1, // Vous pouvez laisser null si votre backend s'en occupe
            content: '', // Initialiser à une chaîne vide ou une valeur par défaut
            correct: false // Initialiser à false ou une valeur par défaut
        };
        this.options.push(newOption);

    }
    dialogOpen: boolean = false;
    dialogData: any = {
        content: '',
        options: [{ content: '', correct: false }]
    };

    openDialog(): void {
        this.dialogOpen = true;
        // Initialiser les champs du formulaire avec les données de dialogData
        this.addForm.setValue({
            content: this.dialogData.content,
            options: this.dialogData.options.map(option => option.content)
        });
    }

    closeDialog(): void {
        this.dialogOpen = false;
    }

    saveQuestion(): void {


        if (this.addForm.valid || this.updateForm.valid) {
            let quizData;
             console.log(this.addForm)
            if (this.isNewQuestion) {

                const optionsData = [];
                this.options.forEach(option => {
                    optionsData.push({
                        content: option.content,
                        correct: option.correct // Assurez-vous d'inclure toutes les propriétés nécessaires pour chaque option
                    });
                });

                quizData = {
                    content: this.addForm.value.content,
                    options: optionsData
                };


                console.log(quizData.options[0].content);
                this.questionQuizService.addQuestionToQuiz(quizData,this.quizId).subscribe(
                    (response) => {
                        console.log('Question ajouté avec succès : ', response);
                        this.loadQuestions(this.quizId) // Recharger la liste des quizzes après l'ajout
                    },
                    (error) => {
                        console.error('Une erreur s\'est produite lors de l\'ajout de la question : ', error);
                    }
                );
            }
            else {
                const quizData = this.updateForm.value;
                console.log(this.updateForm.value)
                // Si ce n'est pas un nouveau quiz, mettez à jour les valeurs du formulaire
                this.questionQuizService.updateQuestion(quizData).subscribe(
                    (response) => {
                        console.log('Question mis à jour avec succès : ', response);
                        this.loadQuestions(this.quizId); // Recharger la liste des quizzes après la mise à jour
                    },
                    (error) => {
                        console.error('Une erreur s\'est produite lors de la mise à jour de la question : ', error);
                    }
                );
            }}
        else {
            console.error('Le formulaire n\'est pas valide');
        }
    }





    deleteQuestion(): void {
        if (this.selectedQuestion) {
            //if (confirm('Voulez-vous vraiment supprimer ce quiz ?')) {
                this.questionQuizService.deleteQuestion(this.selectedQuestion).subscribe(
                    (response) => {
                        console.log('Quiz supprimé avec succès : ', response);
                        this.loadQuestions(this.quizId); // Recharger la liste des quizzes après la suppression

                    },
                    (error) => {
                        console.error('Une erreur s\'est produite lors de la suppression du quiz : ', error);
                    }
                );
          //  }
        } else {
            console.error('Aucun quiz sélectionné pour la suppression');
        }
    }


/*
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
*/
}
