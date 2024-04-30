import { Component, EventEmitter, OnInit, Output } from '@angular/core';
 
import { EventService } from 'src/app/services/event.service';
import { Event } from "../../interfaces/event";
import { MessageService, SelectItem } from 'primeng/api';
import { ReservationService } from 'src/app/services/reservation.service';
import { Reservation } from 'src/app/interfaces/reservation';
import { TypeEvent } from "../../interfaces/type-event";
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-eventfront',
  templateUrl: './eventfront.component.html',
  styleUrl: './eventfront.component.scss'
})
export class EventfrontComponent implements OnInit{
events: Event[] = [];
sortOrder: number = 0;
sortField: string = '';
event: Event = {};
searchInput: string = '';
searchResults: any[] = [];
sortOptions: SelectItem[] = [];
searchEventValue: any;
eventTypes: SelectItem[] = Object.keys(TypeEvent).map((key) => ({
  label: TypeEvent[key as keyof typeof TypeEvent],
  value: TypeEvent[key as keyof typeof TypeEvent],
}));
selectedTypes: string[] = [];

constructor(private eventService : EventService,
  private reservationService: ReservationService,
  private messageService: MessageService,
  private router: Router
){}



ngOnInit() {
  this.getEvent();
}

getEvent(): void {
  this.eventService.getAllEvent().subscribe(
    (events: Event[]) => {
      this.events = events;
      console.log('Events:', this.events);
    },
    (error) => {
      console.log('Error fetching events:', error);
    }
  );
}

bookEvent(eventId: number): void {
 const reservation: Reservation = {
    //user: { id_user: 1, role: "ClubManager" }
  };

  this.reservationService.addReservation(eventId, reservation)
    .subscribe(
      () => {
        // La réservation a été ajoutée avec succès
        console.log('Réservation ajoutée pour l\'événement avec l\'ID : ', eventId);
        this.messageService.add({severity:'success', summary:'Success', detail:'Réservation effectuée avec succès!'});
        // Ajout de la notification avant la redirection
        //this.router.navigate(['/listReservationEvent']);
      },
      error => {
        // Gérez les erreurs
        console.error('Impossible de réserver. Toutes les places sont déjà réservées.', error);
        this.messageService.add({severity:'error', summary:'Error', detail:'Impossible de réserver. Toutes les places sont déjà réservées.'});
      }
    );
}
searchEventsByType() {
  
  // Si aucun type n'est sélectionné, affichez tous les événements
  if (this.selectedTypes.length === 0) {
    this.getEvent();
    return;
  }

  // Recherchez les événements par type
  this.eventService.searchEventByType(this.selectedTypes).subscribe(
    (events: Event[]) => {
      this.events = events;
      console.log('Events filtered by type:', this.events);
    },
    (error) => {
      console.log('Error fetching events by type:', error);
    }
  );
}

 
}

