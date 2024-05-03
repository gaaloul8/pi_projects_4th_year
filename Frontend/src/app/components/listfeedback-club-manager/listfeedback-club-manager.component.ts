import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { Feedback } from 'src/app/interfaces/feedback';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-listfeedback-club-manager',
  templateUrl: './listfeedback-club-manager.component.html',
  styleUrl: './listfeedback-club-manager.component.scss'
})
export class ListfeedbackClubManagerComponent implements OnInit{
  feedbackForm:FormGroup;
  feedback: Feedback;
  feedbackContent: Feedback;
  feedbacks: Feedback[] = [];
  displayDialog: boolean = false;
  constructor(private feedbackservice : FeedbackService,private dialogService: DialogModule,private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.getAllfeedbackReçu();
  }

  getAllfeedbackReçu(){
    this.feedbackservice.getAllFeedbacksForUser()
    .subscribe(
      feedbacks => {
        this.feedbacks = feedbacks;
        console.log('Feed back de l\'utilisateur:', feedbacks);
      },
      error => {
        console.error('Erreur lors de la récupération des feedback de l\'utilisateur:', error);
      }
    );
  } 

  editEvent(feedbackId: number) {
    this.feedbackservice.getFeedbackById(feedbackId).subscribe(
      (feedback) => {
        this.feedbackContent = feedback; // Affecter le feedback récupéré à feedbackContent
        this.displayDialog = true;
      },
      (error) => {
        console.error('Error fetching feedback:', error);
        this.messageService.add({severity:'error', summary:'Error', detail:'Failed to fetch feedback content.'});
      }
    );
  }
  
}
