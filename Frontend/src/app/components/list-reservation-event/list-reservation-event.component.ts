import { Component, OnInit } from '@angular/core';
import { Event } from "../../interfaces/event";
import { EventService } from 'src/app/services/event.service';
import { MessageService } from 'primeng/api';
import { ReservationService } from 'src/app/services/reservation.service';
import { Reservation } from 'src/app/interfaces/reservation';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/interfaces/feedback';
import { Router } from '@angular/router';
import { RatingChangeEvent } from 'angular-star-rating';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-list-reservation-event',
  templateUrl: './list-reservation-event.component.html',
  styleUrl: './list-reservation-event.component.scss'
})
export class ListReservationEventComponent  implements OnInit {
  events: Event[] = [];
 // reservations: Reservation[] = [];
  reservation: Reservation;
 // deleteRDialog: boolean = false;
  //selectedRId: number;
  displayDialog: boolean = false;
  feedbackContent: string = '';
  selectedEventId: number;
  rating: number = 0;
  //userIdentifiant: string;
  searchIdentifiant: string = ''; // Propriété pour stocker la valeur de recherche
  //filteredReservations: any[] = [];

  reservations: Reservation[] = [];
  deleteRDialog: boolean = false;
  selectedRId: number;
  userIdentifiant: string;
  filteredReservations: Reservation[] = [];
  _filterText: string = '';

  get filterText(){
    return this._filterText;
  }

  set filterText(value: string){
      this._filterText=value;
      this.filteredReservations = this.filterByIdentifiant(value);
  }

  constructor(private reservationService: ReservationService,
    private messageService: MessageService,
    private feedbackService : FeedbackService,
    private router: Router,
    private eventService : EventService){}

  ngOnInit(): void {
    this.getReservationsForCurrentUser();
    this.filteredReservations = this.reservations;
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

  filterReservations(): void {
    // Filtrer uniquement si la barre de recherche n'est pas vide
    if (this.searchIdentifiant.trim() !== '') {
      this.filteredReservations = this.reservations.filter((reservation) =>
        reservation.user.identifiant.toLowerCase().includes(this.searchIdentifiant.toLowerCase())
      );
    } else {
      // Si la barre de recherche est vide, afficher la liste complète
      this.filteredReservations = this.reservations;
    }
}
  
  confirmDeleteReservation(idR: number) {
    this.reservationService.deleteReservation(idR)
      .subscribe(
        () => {
          // La suppression de l'événement a réussi
          console.log('reservation deleted with ID:', idR);
          this.messageService.add({severity:'success', summary:'Success', detail:'Reservation deleted successfully!'});
          this.getReservationsForCurrentUser(); // Mettez à jour les données si nécessaire
          this.deleteRDialog = false; // Fermer la boîte de dialogue après la suppression
        },
        error => {
          // Gestion des erreurs
          console.error('Error deleting  Reservation:', error);
          this.messageService.add({severity:'error', summary:'Error', detail:'Error deleting reservation.'});
        }
      );
  }
  
  confirmDelete(idR: number){
    this.selectedRId = idR;
    this.deleteRDialog = true;
  }

  showDialog(reservation: Reservation) {
    this.reservation = reservation; // Stocker la réservation sélectionnée
    this.displayDialog = true; // Afficher le dialogue
}
rateEvent(rating: number): void {
  this.rating = rating;
}

onRatingUpdated(event: RatingChangeEvent): void {
  this.rating = event.rating;
}

assignTokens(eventId: number, userId: number) {
  this.eventService.assignTokens(eventId, userId).subscribe(
    (response) => {
      console.log('Tokens assigned successfully:', response);
      this.messageService.add({severity:'success', summary:'Success', detail:'Token added successfully!'});
     
    },
    (error) => {
      console.error('Failed to assign tokens:', error);
      this.messageService.add({severity:'success', summary:'Success', detail:'Token added successfully!'});
      
    }
  );
}

filterByIdentifiant(filterterme: string){
  if(this.reservations.length === 0 || this.filterText === ''){
    return this.reservations;
} else {
    return this.reservations.filter((reservation) => 
    { 
        return reservation.user.identifiant.toLowerCase() === filterterme.toLowerCase()
    })
}

}

}
