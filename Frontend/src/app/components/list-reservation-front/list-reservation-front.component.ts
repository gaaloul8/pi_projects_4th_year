import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Feedback } from 'src/app/interfaces/feedback';
import { Reservation } from 'src/app/interfaces/reservation';
import { EventService } from 'src/app/services/event.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-list-reservation-front',
  templateUrl: './list-reservation-front.component.html',
  styleUrl: './list-reservation-front.component.scss'
})
export class ListReservationFrontComponent {
  events: Event[] = [];
  reservations: Reservation[] = [];
  reservation: Reservation;
  deleteRDialog: boolean = false;
  selectedRId: number;
  displayDialog: boolean = false;
  feedbackContent: string = '';
  selectedEventId: number;
  rating: number = 0;
  userIdentifiant: string;
  uniqueEventIds: number[] = [];

  constructor(private reservationService: ReservationService,
    private messageService: MessageService,
    private feedbackService : FeedbackService,
    private router: Router,
    private eventService : EventService){}

  ngOnInit(): void {
    this.getReservationsForCurrentUser();

  }
  getReservationsForCurrentUser() {
   // const userId = 1; // Remplacez ceci par l'ID de l'utilisateur connecté
    this.reservationService.getAllReservationsForUser()
      .subscribe(
        reservations => {
          this.reservations = reservations;
          console.log('Réservations de l\'utilisateur:', reservations);
        },
        error => {
          console.error('Erreur lors de la récupération des réservations de l\'utilisateur:', error);
        }
      );
  }

/*

  showDialog(reservation: Reservation) {
    this.reservation = reservation; // Stocker la réservation sélectionnée
    const eventDate = new Date(reservation.evenementR.datetime);
    const currentDate = new Date();
    if (eventDate < currentDate ) {
      // Si la date de l'événement est passée, ne pas afficher le dialogue
      this.messageService.add({severity:'error', summary:'Erreur', detail:'La date de l\'événement est passée. Vous ne pouvez pas ajouter de feedback.'});
    }
    
    else {
      this.displayDialog = true; // Afficher le dialogue
    }
  }
  */

  showDialog(reservation: Reservation) {
    this.reservation = reservation; // Stocker la réservation sélectionnée
    const eventDate = new Date(reservation.evenementR.datetime);
    const currentDate = new Date();
    const isSameDate = eventDate.toDateString() === currentDate.toDateString();
  
    if (isSameDate) {
      // Si la date de l'événement est égale à la date actuelle, afficher le dialogue
      this.displayDialog = true;
    } else {
      // Si la date de l'événement est différente de la date actuelle, afficher un message d'erreur
      this.messageService.add({severity:'error', summary:'Erreur', detail:'Vous ne pouvez ajouter de feedback que pour un événement qui se déroule aujourd\'hui.'});
    }
  }
  
  

  

addFeedback(eventId: number) {
  const feedback: Feedback = {
    content: this.feedbackContent,
    rating:this.rating
  };

  this.feedbackService.addFeedback(eventId, feedback)
    .subscribe(
      (response) => {
        console.log('Feedback ajouté avec succès pour l\'événement avec ID :', eventId);
        // Réinitialiser le contenu du feedback après l'ajout réussi
        this.feedbackContent = '';
        this.displayDialog = false;
        // Rediriger l'utilisateur vers la liste des feedbacks
        this.router.navigate(['/main/listFeedBack']);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du feedback :', error);
      }
    );
}
extractUniqueEventIds() {
  const uniqueIdsSet = new Set<number>();
  this.reservations.forEach(reservation => uniqueIdsSet.add(reservation.evenementR.idEvent));
  this.uniqueEventIds = Array.from(uniqueIdsSet);
}
}
