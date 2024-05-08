import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Feedback } from 'src/app/interfaces/feedback';
import { Event } from 'src/app/interfaces/event';
import { Reservation } from 'src/app/interfaces/reservation';
import { EventService } from 'src/app/services/event.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserModel } from 'src/app/models/userModel';

@Component({
  selector: 'app-list-reservation-front',
  templateUrl: './list-reservation-front.component.html',
  styleUrl: './list-reservation-front.component.scss'
})
export class ListReservationFrontComponent {
  event: Event[] = [];
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
  searchTerm: string = '';
  sortBy: string = 'date';
  check: boolean;
  user:UserModel;
  bookedEvents: number[] = [];

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


extractUniqueEventIds() {
  const uniqueIdsSet = new Set<number>();
  this.reservations.forEach(reservation => uniqueIdsSet.add(reservation.evenementR.idEvent));
  this.uniqueEventIds = Array.from(uniqueIdsSet);
}

filterReservations() {
  if (!this.searchTerm) {
    this.getReservationsForCurrentUser();
    return;
  }

  this.reservations = this.reservations.filter(reservation =>
    reservation.evenementR.eventName.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}


changeSortBy(sortBy: string) {
  this.sortBy = sortBy;
  this.getReservationsForCurrentUser(); // Récupérer les réservations en fonction du nouveau critère de tri
}

async addFeedback(eventId: number) {
  const feedback: Feedback = {
    content: this.feedbackContent,
    rating:this.rating
  };
  this.check= await this.reservationService.checkuser(this.user.id_user,eventId).toPromise();
  console.log(this.check);
  if(this.check){
    this.messageService.add({severity:'error', summary:'Error', detail:'Impossible de réserver. Vous avez déja réservez.'});

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


}
isEventBooked(eventId: number): boolean {
  // Vérifier si l'événement est présent dans la liste des événements réservés par l'utilisateur
  return this.bookedEvents.includes(eventId);
}


}