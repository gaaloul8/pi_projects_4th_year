import { Component, OnInit } from '@angular/core';
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
  constructor(private feedbackservice: FeedbackService,private messageService: MessageService){}

  ngOnInit(): void {
    this.getAllFeedBacksForCurrentUser();
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


  confirmDeleteFeedBack(idFeedback: number) {
    this.feedbackservice.deleteFeedBack(idFeedback)
      .subscribe(
        () => {
          this.getAllFeedBacksForCurrentUser(); // Mettez à jour les données si nécessaire
          this.deleteRDialog = false; // Fermer la boîte de dialogue après la suppression
        },
        error => {
          console.error('Error deleting feedback:', error);
        }
      );
  }
  
  confirmDelete(idFeedback: number){
    this.selectedFeedbackId = idFeedback;
    this.deleteRDialog = true;
  }

  updateFeedBack(feedbacktoupdate: Feedback) {
    this.feedbackservice.updateFeedback(feedbacktoupdate).subscribe(
      updatedEvent => {
        console.log('Event updated:', updatedEvent);
        this.feedbackDialog = false;
        window.location.reload();
      },
      error => {
        console.error('Error updating event:', error);
      }
    );
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
