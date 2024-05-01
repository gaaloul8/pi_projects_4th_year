import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/interfaces/feedback';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-listfeedback-club-manager',
  templateUrl: './listfeedback-club-manager.component.html',
  styleUrl: './listfeedback-club-manager.component.scss'
})
export class ListfeedbackClubManagerComponent implements OnInit{

  feedback: Feedback;
  feedbacks: Feedback[] = [];
  constructor(private feedbackservice : FeedbackService){}

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
}
