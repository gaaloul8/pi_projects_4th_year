import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Feedback } from 'src/app/interfaces/feedback';
import { Reservation } from 'src/app/interfaces/reservation';
import { FeedbackService } from 'src/app/services/feedback.service';
 

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent implements OnInit {
  feedbacks: Feedback[]=[];
  feedback : Feedback;
  deleteRDialog: boolean = false;
  selectedFeedbackId: number;
  feedbackDialog: boolean = false;
  submitted: boolean = false;
  feedbackForm: FormGroup;
  feedbackToUpdate: Feedback;

  constructor(private feedbackservice: FeedbackService,private messageService: MessageService,private formBuilder: FormBuilder){
  
  }

  ngOnInit(): void {
    this.getAllFeedBacksForCurrentUser();
    this.feedbackForm = this.formBuilder.group({
        content: ['', Validators.required]
    });
}

  getAllFeedBacksForCurrentUser() {
   // const  = 1; // Remplacez ceci par l'ID de l'utilisateur connecté
    this.feedbackservice.getAllFeedbacksForUser()
      .subscribe(
        feedbacks => {
          this.feedbacks = feedbacks;
          console.log('Feed Back de l\'utilisateur:', feedbacks);
        },
        error => {
          console.error('Erreur lors de la récupération des  feed back de l\'utilisateur:', error);
        }
      );
  }
  confirmDeleteFeedback(idFeedback: number) {
    this.feedbackservice.deleteFeedBack(idFeedback)
      .subscribe(
        () => {
          // La suppression de l'événement a réussi
          console.log('Event deleted with ID:', idFeedback);
          this.getAllFeedBacksForCurrentUser(); // Mettez à jour les données si nécessaire
          this.deleteRDialog = false// Fermer la boîte de dialogue après la suppression
        },
        error => {
          // Gestion des erreurs
          console.error('Error deleting event:', error);
        }
      );
  }
  

  confirmDelete(idFeedback: number){
    this.selectedFeedbackId = idFeedback;
    this.deleteRDialog = true;
  }
  
  updateFeedback(idFeedback: number): void {
    this.submitted = true;
    try {
      this.feedbackservice.updateFeedback(idFeedback, this.feedbackForm.value).toPromise();
      this.messageService.add({severity:'success', summary:'Success', detail:'Feedback updated successfully!'});
      console.log("Feedback updated Successfully");
      window.location.reload();
    } catch (error) {
      console.error(error);    
    }
  }
  
  editFeedBack(feedbackEdit : Feedback) {
    this.feedback = { ...feedbackEdit };
    this.feedbackDialog = true;
  }
  hideDialog() {
    this.feedbackDialog  = false;
    this.submitted = false;
  }


}
