import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { RatingChangeEvent } from 'angular-star-rating';
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
  rating: number = 0;
  test:any;

  constructor(private feedbackservice: FeedbackService,private messageService: MessageService,private formBuilder: FormBuilder){
  
  }


  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group({
      content: [''],
      rating: ['']
    });

    this.getAllFeedbacksForCurrentUser();
  }

  getAllFeedbacksForCurrentUser() {
    this.feedbackservice.getAllFeedbacksForUser()
      .subscribe(
        feedbacks => {
          this.feedbacks = feedbacks;
        },
        error => {
          console.error('Error fetching feedbacks:', error);
        }
      );
  }

  editFeedback(feedback: Feedback) {
    this.feedbackToUpdate = { ...feedback }; // Copy feedback to update
    this.feedbackForm.patchValue({
      content: feedback.content,
      rating: feedback.rating
    });
    this.feedbackDialog = true;
  }

  updateFeedback(feedback : Feedback) {

    console.log(feedback.content)
    console.log(feedback.rating)
    this.submitted = true;
    if (this.feedbackForm.invalid) {
      return;
    }
    
    this.feedbackToUpdate.content = this.feedbackForm.value.content;
    this.feedbackToUpdate.rating = this.feedbackForm.value.rating;
 

    this.feedbackservice.updateFeedback(feedback.idFeedback,feedback)
      .subscribe(
        updatedFeedback => {
          const index = this.feedbacks.findIndex(feedback => feedback.idFeedback === updatedFeedback.idFeedback);
          
          if (index !== -1) {
            this.feedbacks[index] = updatedFeedback;
          }
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Feedback updated successfully!' });
          this.feedbackDialog = false;
        },
        error => {
          console.error('Error updating feedback:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update feedback.' });
        }
      );
  }

  hideDialog() {
    this.feedbackDialog = false;
    this.submitted = false;
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
  onRatingChange(event: any) {
    this.feedback.rating = event.target.value;
    console.log(this.feedback.rating);
}




}
